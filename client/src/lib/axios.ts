import axios from "axios";
import { BASE_URL } from "./config";

export const _axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Routes that are allowed to return 401/403 without triggering auto-logout.
// Login & session checks are intentionally excluded so their error messages
// reach the catch blocks in components (e.g. "account blocked" on login).
const AUTH_ROUTES = [
    "/user-auth/send-otp",
    "/user-auth/verify-otp",
    "/user-auth/google-login",
    "/user-auth/session",
    "/user-auth/logout",
];

// The logout function is registered by AuthProvider after it mounts.
// This avoids a circular import between axios.ts and useAuth.tsx.
let _logoutHandler: (() => void) | null = null;

export const setLogoutHandler = (fn: () => void) => {
    _logoutHandler = fn;
};

if (typeof window !== "undefined") {
    _axios.interceptors.response.use(
        (response) => response,
        (error) => {
            const status = error.response?.status;
            const url: string = error.config?.url ?? "";

            const isAuthRoute = AUTH_ROUTES.some((r) => url.includes(r));

            if (status === 401 && !isAuthRoute) {
                // Blocked / session-expired on a protected route:
                // fire logout immediately so the UI reacts without waiting for
                // the next 60-second session poll.
                if (_logoutHandler) _logoutHandler();
            }

            // Always re-throw with the ORIGINAL error so components can read
            // error.response.data.message (e.g. "Your account has been blocked").
            return Promise.reject(error);
        }
    );
}

