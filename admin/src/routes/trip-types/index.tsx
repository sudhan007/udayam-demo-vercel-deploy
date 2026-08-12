import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { _axios } from '@/lib/axios'
import { Pagination } from '@/components/Pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { SearchInput } from '@/components/SearchInput'
import { Plus, Pencil, Trash2, Check, X, Calendar } from 'lucide-react'
import { toast } from 'sonner'

interface TripTypesSearch {
  page?: number
  limit?: number
  search?: string
  isActive?: string
}

export const Route = createFileRoute('/trip-types/')({
  validateSearch: (search: Record<string, unknown>): TripTypesSearch => ({
    page: search.page ? Number(search.page) : 1,
    limit: search.limit ? Number(search.limit) : 10,
    search: typeof search.search === 'string' ? search.search : undefined,
    isActive: typeof search.isActive === 'string' ? search.isActive : undefined,
  }),
  component: TripTypesIndexComponent,
})

type TripType = {
  _id: string
  name: string
  isActive: boolean
  createdAt: string
}

type PaginationMeta = {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

type FilterState = {
  search: string
  isActive: string
}

function TripTypesIndexComponent() {
  const queryClient = useQueryClient()
  const searchParams = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const page = searchParams.page ?? 1
  const limit = searchParams.limit ?? 10

  const filters: FilterState = {
    search: searchParams.search ?? '',
    isActive: searchParams.isActive ?? 'all',
  }

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editItem, setEditItem] = useState<TripType | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Forms state
  const [newName, setNewName] = useState('')
  const [newIsActive, setNewIsActive] = useState(true)

  const [editName, setEditName] = useState('')
  const [editIsActive, setEditIsActive] = useState(true)

  const setPage = (p: number) => {
    navigate({ search: (prev) => ({ ...prev, page: p }) })
  }

  const setLimit = (l: number) => {
    navigate({ search: (prev) => ({ ...prev, limit: l, page: 1 }) })
  }

  const setFilter = (key: keyof FilterState, value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: value || undefined,
        page: 1,
      }),
    })
  }

  const queryParams = {
    page: page.toString(),
    limit: limit.toString(),
    ...(filters.search && { search: filters.search }),
    ...(filters.isActive !== 'all' && { isActive: filters.isActive }),
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['trip-types', queryParams],
    queryFn: async () => {
      const res = await _axios.get('/trip-types', { params: queryParams })
      return res.data as { data: TripType[]; pagination: PaginationMeta }
    },
  })

  const addMutation = useMutation({
    mutationFn: (body: { name: string; isActive: boolean }) =>
      _axios.post('/trip-types', body),
    onSuccess: (res: any) => {
      toast.success(res.data?.message || 'Trip type created successfully')
      setIsAddOpen(false)
      setNewName('')
      setNewIsActive(true)
      queryClient.invalidateQueries({ queryKey: ['trip-types'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to create trip type')
    },
  })

  const editMutation = useMutation({
    mutationFn: (body: { id: string; name: string; isActive: boolean }) =>
      _axios.patch(`/trip-types/${body.id}`, {
        name: body.name,
        isActive: body.isActive,
      }),
    onSuccess: (res: any) => {
      toast.success(res.data?.message || 'Trip type updated successfully')
      setEditItem(null)
      queryClient.invalidateQueries({ queryKey: ['trip-types'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to update trip type')
    },
  })

  const toggleMutation = useMutation({
    mutationFn: (id: string) => _axios.patch(`/trip-types/${id}/toggle-active`),
    onSuccess: (res: any) => {
      toast.success(res.data?.message || 'Trip type status updated')
      queryClient.invalidateQueries({ queryKey: ['trip-types'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to toggle status')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => _axios.delete(`/trip-types/${id}`),
    onSuccess: (res: any) => {
      toast.success(res.data?.message || 'Trip type deleted successfully')
      setDeleteId(null)
      queryClient.invalidateQueries({ queryKey: ['trip-types'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to delete trip type')
    },
  })

  const tripTypes = data?.data ?? []
  const pagination = data?.pagination

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const handleOpenEdit = (item: TripType) => {
    setEditItem(item)
    setEditName(item.name)
    setEditIsActive(item.isActive)
  }

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Trip Types</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage available trip types (e.g. Honeymoon, Solo, Adventure) for
            packages
          </p>
        </div>
        <Button
          className="gap-2 shrink-0 cursor-pointer"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Trip Type
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center bg-muted/20 p-4 rounded-xl border">
        <SearchInput
          placeholder="Search trip types by name..."
          className="max-w-[300px]"
          value={filters.search}
          onChange={(v) => setFilter('search', v)}
        />

        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={filters.isActive}
            onValueChange={(v) => setFilter('isActive', v)}
          >
            <SelectTrigger className="h-9 w-40 text-sm bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="true">Active Only</SelectItem>
              <SelectItem value="false">Inactive Only</SelectItem>
            </SelectContent>
          </Select>

          {(filters.search || filters.isActive !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigate({
                  search: (prev) => ({
                    page: 1,
                    limit: prev.limit,
                  }),
                })
              }}
              className="text-xs h-9 cursor-pointer"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden bg-background">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Trip Type Name</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="w-32">Status</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: limit }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 4 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-12 text-muted-foreground"
                >
                  Failed to load trip types. Please try again.
                </TableCell>
              </TableRow>
            ) : tripTypes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-12 text-muted-foreground"
                >
                  No trip types found.
                </TableCell>
              </TableRow>
            ) : (
              tripTypes.map((item) => (
                <TableRow key={item._id} className="hover:bg-muted/30">
                  <TableCell className="font-semibold text-sm text-foreground">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      // onClick={() => toggleMutation.mutate(item._id)}
                      disabled={toggleMutation.isPending}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1  transition-colors ${
                        item.isActive
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      {item.isActive ? (
                        <>
                          <Check className="w-3 h-3" /> Active
                        </>
                      ) : (
                        <>
                          <X className="w-3 h-3" /> Inactive
                        </>
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => handleOpenEdit(item)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive cursor-pointer"
                        onClick={() => setDeleteId(item._id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.total}
          itemsPerPage={limit}
          onPageChange={(p) => setPage(p)}
          onLimitChange={(l) => {
            setLimit(l)
            setPage(1)
          }}
        />
      )}

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Add Trip Type</DialogTitle>
            <DialogDescription>
              Create a new trip type selection for packages.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div className="space-y-1.5">
              <Label htmlFor="name">Trip Type Name</Label>
              <Input
                id="name"
                placeholder="e.g. Honeymoon, Adventure"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            {/* <div className="flex items-center justify-between rounded-lg border p-3.5 shadow-xs">
              <div className="space-y-0.5">
                <Label htmlFor="isActive" className="text-sm font-medium">
                  Active Status
                </Label>
                <p className="text-xs text-muted-foreground">
                  Enable this trip type immediately
                </p>
              </div>
              <Switch
                id="isActive"
                checked={newIsActive}
                onCheckedChange={setNewIsActive}
              />
            </div> */}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              disabled={addMutation.isPending || !newName.trim()}
              onClick={() =>
                addMutation.mutate({ name: newName, isActive: newIsActive })
              }
              className="cursor-pointer"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editItem}
        onOpenChange={(open) => !open && setEditItem(null)}
      >
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Edit Trip Type</DialogTitle>
            <DialogDescription>
              Update name or status details for this trip type.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div className="space-y-1.5">
              <Label htmlFor="editName">Trip Type Name</Label>
              <Input
                id="editName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            {/* <div className="flex items-center justify-between rounded-lg border p-3.5 shadow-xs">
              <div className="space-y-0.5">
                <Label htmlFor="editIsActive" className="text-sm font-medium">
                  Active Status
                </Label>
                <p className="text-xs text-muted-foreground">
                  Availability state of this trip type
                </p>
              </div>
              <Switch
                id="editIsActive"
                checked={editIsActive}
                onCheckedChange={setEditIsActive}
              />
            </div> */}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditItem(null)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              disabled={editMutation.isPending || !editName.trim()}
              onClick={() =>
                editItem &&
                editMutation.mutate({
                  id: editItem._id,
                  name: editName,
                  isActive: editIsActive,
                })
              }
              className="cursor-pointer"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the trip type from the database. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
