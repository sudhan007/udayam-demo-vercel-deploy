//@ts-nocheck
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react"
import { _axios, setLogoutHandler } from "./axios"

export interface AuthUser {
  _id: string
  fullName: string
  email?: string
  mobile?: string
  countryCode?: string
  profileImage?: string
  loginType: "MOBILE" | "GOOGLE"
  status?: "ACTIVE" | "BLOCKED" | "DELETED"
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  refetch: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  refetch: async () => {},
  logout: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchSession = useCallback(async () => {
    try {
      const res = await _axios.get("/user-auth/session")
      if (res.data?.status && res.data?.data) {
        setUser(res.data.data as AuthUser)
      } else {
        setUser(null)
      }
    } catch {
      // A 401 from the session endpoint means the user is logged out or blocked
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await _axios.post("/user-auth/logout")
    } catch {
      // ignore
    }
    setUser(null)
  }, [])

  // Initial session fetch on mount
  useEffect(() => {
    fetchSession()
  }, [fetchSession])

  // Register logout with the axios interceptor so any 401 from a protected
  // API call (e.g. booking, profile) immediately clears the user session
  // without waiting for the 60-second poll. This replaces the polling interval.
  useEffect(() => {
    setLogoutHandler(() => setUser(null))
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoading, refetch: fetchSession, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
