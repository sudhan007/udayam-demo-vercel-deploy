// import { useEffect, useRef, useState } from 'react'
// import { useForm, Controller } from 'react-hook-form'
// import { useQuery } from '@tanstack/react-query'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { Label } from '@/components/ui/label'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { X, ImageIcon, Tag, Calendar } from 'lucide-react'
// import { SearchInput } from '@/components/SearchInput'
// import { cn } from '@/lib/utils'
// import { _axios } from '@/lib/axios'
// import dayjs from 'dayjs'
// export type CouponFormValues = {
//   title: string
//   description?: string
//   couponCode: string
//   bannerImage?: File
//   discountType: 'PERCENTAGE' | 'FIXED_AMOUNT'
//   discountValue: number
//   minimumBookingAmount: number
//   totalUsageLimit: number
//   perUserUsageLimit: number
//   applicableFor: 'ALL' | 'STANDARD' | 'CUSTOMIZED' | 'SELECTED'
//   packageIds: string[]
//   userType: 'ALL_USERS' | 'NEW_USERS' | 'EXISTING_USERS' | 'SELECTED_USERS'
//   userIds: string[]
//   validFrom: string
//   validTo: string
//   status: 'ACTIVE' | 'INACTIVE'
// }

// type Props = {
//   defaultValues?: Partial<CouponFormValues>
//   existingBannerImageUrl?: string
//   onSubmit: (data: CouponFormValues) => void
//   isSubmitting: boolean
//   submitLabel: string
//   onCancel: () => void
// }

// function Section({
//   title,
//   children,
// }: {
//   title: string
//   children: React.ReactNode
// }) {
//   return (
//     <div className="rounded-xl border bg-card p-5 space-y-4">
//       <h3 className="text-sm font-semibold text-foreground tracking-tight">
//         {title}
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
//     </div>
//   )
// }

// export function CouponForm({
//   defaultValues,
//   existingBannerImageUrl,
//   onSubmit,
//   isSubmitting,
//   submitLabel,
//   onCancel,
// }: Props) {
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [imagePreview, setImagePreview] = useState<string | null>(
//     existingBannerImageUrl || null,
//   )
//   const [packageSearch, setPackageSearch] = useState('')

//   useEffect(() => {
//     setImagePreview(existingBannerImageUrl || null)
//   }, [existingBannerImageUrl])
//   const [packagePage, setPackagePage] = useState(1)
//   const [userSearch, setUserSearch] = useState('')
//   const [userPage, setUserPage] = useState(1)

//   // Fetch paginated packages
//   const { data: packagesRes } = useQuery({
//     queryKey: ['helper-packages', packageSearch, packagePage],
//     queryFn: async () => {
//       const res = await _axios.get('/coupon/helper/packages', {
//         params: {
//           page: String(packagePage),
//           limit: '8',
//           search: packageSearch,
//           bookingType: 'STANDARD',
//         },
//       })
//       return res.data as {
//         data: {
//           _id: string
//           title: string
//           destination: string
//           packageType: string
//           bookingType: string
//         }[]
//         pagination: {
//           total: number
//           page: number
//           limit: number
//           totalPages: number
//           hasNext: boolean
//         }
//       }
//     },
//   })

//   // Fetch paginated users
//   const { data: usersRes } = useQuery({
//     queryKey: ['helper-users', userSearch, userPage],
//     queryFn: async () => {
//       const res = await _axios.get('/coupon/helper/users', {
//         params: { page: String(userPage), limit: '8', search: userSearch },
//       })
//       return res.data as {
//         data: {
//           _id: string
//           fullName: string
//           mobile: string
//           email?: string
//         }[]
//         pagination: {
//           total: number
//           page: number
//           limit: number
//           totalPages: number
//           hasNext: boolean
//         }
//       }
//     },
//   })

//   const availablePackages = packagesRes?.data ?? []
//   const availableUsers = usersRes?.data ?? []

//   const formattedDefaultValues: any = {
//     title: '',
//     description: '',
//     couponCode: '',
//     discountType: 'PERCENTAGE',
//     discountValue: 0,
//     minimumBookingAmount: 0,
//     totalUsageLimit: 1,
//     perUserUsageLimit: 1,
//     applicableFor: 'ALL',
//     packageIds: [],
//     userType: 'ALL_USERS',
//     userIds: [],
//     validFrom: '',
//     validTo: '',
//     status: 'ACTIVE',
//     ...defaultValues,
//   }

//   // Format date default values from ISO to date inputs (YYYY-MM-DDThh:mm)
//   if (defaultValues?.validFrom) {
//     formattedDefaultValues.validFrom = dayjs(defaultValues.validFrom).format(
//       'YYYY-MM-DDTHH:mm',
//     )
//   }
//   if (defaultValues?.validTo) {
//     formattedDefaultValues.validTo = dayjs(defaultValues.validTo).format(
//       'YYYY-MM-DDTHH:mm',
//     )
//   }
//   // if (defaultValues?.validFrom) {
//   //   formattedDefaultValues.validFrom = new Date(defaultValues.validFrom).toISOString().slice(0, 16)
//   // }
//   // if (defaultValues?.validTo) {
//   //   formattedDefaultValues.validTo = new Date(defaultValues.validTo).toISOString().slice(0, 16)
//   // }

//   const {
//     register,
//     handleSubmit,
//     control,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<CouponFormValues>({
//     defaultValues: formattedDefaultValues,
//   })

//   const discountType = watch('discountType')
//   const applicableFor = watch('applicableFor')
//   const userType = watch('userType')
//   const selectedPackageIds = watch('packageIds') ?? []
//   const selectedUserIds = watch('userIds') ?? []

//   // Fetch details of selected packages (for lookup)
//   const { data: selectedPackagesDetails } = useQuery({
//     queryKey: ['selected-packages-details', selectedPackageIds],
//     queryFn: async () => {
//       if (!selectedPackageIds.length) return []
//       const res = await _axios.get('/coupon/helper/packages', {
//         params: {
//           ids: JSON.stringify(selectedPackageIds),
//           bookingType: 'STANDARD',
//         },
//       })
//       return res.data?.data as {
//         _id: string
//         title: string
//         destination: string
//         packageType: string
//         bookingType: string
//       }[]
//     },
//     enabled: selectedPackageIds.length > 0,
//   })

//   // Fetch details of selected users (for lookup)
//   const { data: selectedUsersDetails } = useQuery({
//     queryKey: ['selected-users-details', selectedUserIds],
//     queryFn: async () => {
//       if (!selectedUserIds.length) return []
//       const res = await _axios.get('/coupon/helper/users', {
//         params: { ids: JSON.stringify(selectedUserIds) },
//       })
//       return res.data?.data as {
//         _id: string
//         fullName: string
//         mobile: string
//         email?: string
//       }[]
//     },
//     enabled: selectedUserIds.length > 0,
//   })

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setValue('bannerImage', file)
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const removeImage = () => {
//     setValue('bannerImage', undefined)
//     setImagePreview(null)
//     if (fileInputRef.current) fileInputRef.current.value = ''
//   }

//   const togglePackage = (pkgId: string) => {
//     const active = [...selectedPackageIds]
//     const idx = active.indexOf(pkgId)
//     if (idx > -1) {
//       active.splice(idx, 1)
//     } else {
//       active.push(pkgId)
//     }
//     setValue('packageIds', active)
//   }

//   const toggleUser = (userId: string) => {
//     const active = [...selectedUserIds]
//     const idx = active.indexOf(userId)
//     if (idx > -1) {
//       active.splice(idx, 1)
//     } else {
//       active.push(userId)
//     }
//     setValue('userIds', active)
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-6 max-w-4xl pb-12"
//     >
//       {/* 1. Basic Details */}
//       <Section title="Basic Coupon Information">
//         <div className="space-y-1.5">
//           <Label htmlFor="title" className="text-xs font-semibold">
//             Coupon Title *
//           </Label>
//           <Input
//             id="title"
//             placeholder="e.g. Special Holiday Sale"
//             {...register('title', { required: 'Title is required' })}
//           />
//           {errors.title && (
//             <p className="text-xs text-red-500">{errors.title.message}</p>
//           )}
//         </div>

//         <div className="space-y-1.5">
//           <Label htmlFor="couponCode" className="text-xs font-semibold">
//             Coupon Code *
//           </Label>
//           <div className="relative">
//             <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               id="couponCode"
//               placeholder="e.g. SUMMER500"
//               className="pl-9 font-mono font-semibold"
//               {...register('couponCode', {
//                 required: 'Coupon code is required',
//                 onChange: (e) => {
//                   e.target.value = e.target.value.toUpperCase()
//                 },
//               })}
//             />
//           </div>
//           {errors.couponCode && (
//             <p className="text-xs text-red-500">{errors.couponCode.message}</p>
//           )}
//         </div>

//         <div className="md:col-span-2 space-y-1.5">
//           <Label htmlFor="description" className="text-xs font-semibold">
//             Coupon Description
//           </Label>
//           <Textarea
//             id="description"
//             rows={3}
//             placeholder="Write a brief description of the offer terms, limitations, and eligibility..."
//             {...register('description')}
//           />
//         </div>
//       </Section>

//       {/* 2. Banner Upload */}
//       <div className="rounded-xl border bg-card p-5 space-y-4">
//         <h3 className="text-sm font-semibold text-foreground tracking-tight">
//           Coupon Banner Image
//         </h3>
//         <div className="flex flex-col md:flex-row gap-5 items-start">
//           <div
//             className={cn(
//               'w-full md:w-96 aspect-[21/9] rounded-lg border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden bg-muted/40 transition-colors',
//               imagePreview ? 'border-none' : 'hover:border-primary/50',
//             )}
//           >
//             {imagePreview ? (
//               <>
//                 <img
//                   src={
//                     imagePreview.startsWith('data:') ||
//                     imagePreview.startsWith('blob:') ||
//                     imagePreview.startsWith('http://') ||
//                     imagePreview.startsWith('https://')
//                       ? imagePreview
//                       : `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api/V1'}/../uploads/coupons/banners/${imagePreview}`
//                   }
//                   className="w-full h-full object-cover"
//                   alt="Coupon Banner"
//                 />
//                 <button
//                   type="button"
//                   onClick={removeImage}
//                   className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors shadow-md"
//                 >
//                   <X size={14} />
//                 </button>
//               </>
//             ) : (
//               <div
//                 onClick={() => fileInputRef.current?.click()}
//                 className="flex flex-col items-center gap-2 cursor-pointer p-4"
//               >
//                 <div className="p-3 rounded-full bg-background border shadow-sm">
//                   <ImageIcon className="w-5 h-5 text-muted-foreground" />
//                 </div>
//                 <div className="text-center">
//                   <span className="text-xs font-semibold text-primary">
//                     Upload banner image
//                   </span>
//                   <p className="text-[10px] text-muted-foreground mt-1">
//                     Recommended ratio 21:9 (e.g. 1200x514px)
//                   </p>
//                 </div>
//               </div>
//             )}
//             <input
//               type="file"
//               ref={fileInputRef}
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageChange}
//             />
//           </div>
//         </div>
//       </div>

//       {/* 3. Discount Setup */}
//       <Section title="Discount Configuration">
//         <div className="space-y-1.5">
//           <Label htmlFor="discountType" className="text-xs font-semibold">
//             Discount Type *
//           </Label>
//           <Controller
//             name="discountType"
//             control={control}
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger id="discountType">
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
//                   <SelectItem value="FIXED_AMOUNT">Fixed Amount (₹)</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />
//         </div>

//         <div className="space-y-1.5">
//           <Label htmlFor="discountValue" className="text-xs font-semibold">
//             Discount Value *
//           </Label>
//           <Input
//             id="discountValue"
//             type="number"
//             min={0}
//             step="any"
//             placeholder={discountType === 'PERCENTAGE' ? 'e.g. 10' : 'e.g. 500'}
//             {...register('discountValue', {
//               required: 'Discount value is required',
//               valueAsNumber: true,
//             })}
//           />
//           {errors.discountValue && (
//             <p className="text-xs text-red-500">
//               {errors.discountValue.message}
//             </p>
//           )}
//         </div>

//         <div className="space-y-1.5">
//           <Label
//             htmlFor="minimumBookingAmount"
//             className="text-xs font-semibold"
//           >
//             Minimum Booking Amount (₹) *
//           </Label>
//           <Input
//             id="minimumBookingAmount"
//             type="number"
//             min={0}
//             placeholder="e.g. 5000"
//             {...register('minimumBookingAmount', {
//               required: 'Minimum booking amount is required',
//               valueAsNumber: true,
//             })}
//           />
//         </div>
//       </Section>

//       {/* 4. Limits & Validity */}
//       <Section title="Limits & Validity">
//         <div className="space-y-1.5">
//           <Label htmlFor="totalUsageLimit" className="text-xs font-semibold">
//             Total Usage Limit (All Users) *
//           </Label>
//           <Input
//             id="totalUsageLimit"
//             type="number"
//             min={1}
//             placeholder="e.g. 100"
//             {...register('totalUsageLimit', {
//               required: 'Total usage limit is required',
//               valueAsNumber: true,
//             })}
//           />
//         </div>

//         <div className="space-y-1.5">
//           <Label htmlFor="perUserUsageLimit" className="text-xs font-semibold">
//             Usage Limit Per User *
//           </Label>
//           <Input
//             id="perUserUsageLimit"
//             type="number"
//             min={1}
//             placeholder="e.g. 1"
//             {...register('perUserUsageLimit', {
//               required: 'Per user usage limit is required',
//               valueAsNumber: true,
//             })}
//           />
//         </div>

//         <div className="space-y-1.5">
//           <Label
//             htmlFor="validFrom"
//             className="text-xs font-semibold flex items-center gap-1 flex-row"
//           >
//             <Calendar className="w-3.5 h-3.5" /> Valid From *
//           </Label>
//           <Input
//             id="validFrom"
//             type="datetime-local"
//             {...register('validFrom', {
//               required: 'Start validity date is required',
//             })}
//           />
//           {errors.validFrom && (
//             <p className="text-xs text-red-500">{errors.validFrom.message}</p>
//           )}
//         </div>

//         <div className="space-y-1.5">
//           <Label
//             htmlFor="validTo"
//             className="text-xs font-semibold flex items-center gap-1 flex-row"
//           >
//             <Calendar className="w-3.5 h-3.5" /> Valid To *
//           </Label>
//           <Input
//             id="validTo"
//             type="datetime-local"
//             {...register('validTo', {
//               required: 'End validity date is required',
//             })}
//           />
//           {errors.validTo && (
//             <p className="text-xs text-red-500">{errors.validTo.message}</p>
//           )}
//         </div>

//         <div className="space-y-1.5">
//           <Label htmlFor="status" className="text-xs font-semibold">
//             Coupon Status *
//           </Label>
//           <Controller
//             name="status"
//             control={control}
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger id="status">
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ACTIVE">Active</SelectItem>
//                   <SelectItem value="INACTIVE">Inactive</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />
//         </div>
//       </Section>

//       {/* 5. Applicability Controls */}
//       <div className="rounded-xl border bg-card p-5 space-y-4">
//         <h3 className="text-sm font-semibold text-foreground tracking-tight">
//           Package applicability
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-1.5">
//             <Label htmlFor="applicableFor" className="text-xs font-semibold">
//               Applicable Packages *
//             </Label>
//             <Controller
//               name="applicableFor"
//               control={control}
//               render={({ field }) => (
//                 <Select value={field.value} onValueChange={field.onChange}>
//                   <SelectTrigger id="applicableFor">
//                     <SelectValue placeholder="Select applicability" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="ALL">All Packages</SelectItem>
//                     <SelectItem value="STANDARD">
//                       Standard Packages Only
//                     </SelectItem>
//                     <SelectItem value="SELECTED">Selected Packages</SelectItem>
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//           </div>

//           {applicableFor === 'SELECTED' && (
//             <div className="md:col-span-2 space-y-2.5">
//               <Label className="text-xs font-semibold">
//                 Select Applicable Packages *
//               </Label>

//               {/* Selected packages display */}
//               {selectedPackagesDetails &&
//                 selectedPackagesDetails.length > 0 && (
//                   <div className="flex flex-wrap gap-1.5 p-2.5 border rounded-lg bg-muted/20">
//                     {selectedPackagesDetails.map((pkg) => (
//                       <div
//                         key={pkg._id}
//                         className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-[10px] px-2.5 py-0.5 rounded-full border border-blue-200"
//                       >
//                         <span>{pkg.title}</span>
//                         <button
//                           type="button"
//                           onClick={() => togglePackage(pkg._id)}
//                           className="text-blue-500 hover:text-red-500 rounded-full cursor-pointer"
//                         >
//                           <X size={10} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//               <SearchInput
//                 placeholder="Search packages by title or destination..."
//                 value={packageSearch}
//                 onChange={(val) => {
//                   setPackageSearch(val)
//                   setPackagePage(1)
//                 }}
//                 className="bg-muted/30 text-xs"
//                 debounceMs={600}
//               />

//               <div className="border rounded-lg max-h-48 overflow-y-auto p-2 bg-muted/10 space-y-1">
//                 {availablePackages.length === 0 ? (
//                   <p className="text-xs text-muted-foreground text-center py-4">
//                     No packages match search.
//                   </p>
//                 ) : (
//                   availablePackages.map((pkg) => {
//                     const checked = selectedPackageIds.includes(pkg._id)
//                     return (
//                       <div
//                         key={pkg._id}
//                         onClick={() => togglePackage(pkg._id)}
//                         className={cn(
//                           'flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer text-xs transition-colors hover:bg-muted/60 flex-row',
//                           checked
//                             ? 'bg-primary/5 text-primary font-medium'
//                             : '',
//                         )}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={checked}
//                           onChange={() => {}}
//                           className="rounded text-primary cursor-pointer"
//                         />
//                         <span>{pkg.title}</span>
//                         <span className="text-[10px] text-muted-foreground ml-auto bg-background px-1.5 py-0.5 rounded border">
//                           {pkg.destination} ({pkg.bookingType})
//                         </span>
//                       </div>
//                     )
//                   })
//                 )}
//               </div>

//               {/* Package Pagination */}
//               {packagesRes?.pagination && (
//                 <div className="flex items-center justify-between text-[11px] pt-1">
//                   <span className="text-muted-foreground">
//                     Page {packagesRes.pagination.page} of{' '}
//                     {packagesRes.pagination.totalPages || 1} (
//                     {packagesRes.pagination.total} total)
//                   </span>
//                   <div className="flex items-center gap-1">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       className="h-6 px-2 text-[10px]"
//                       disabled={packagePage <= 1}
//                       onClick={() => setPackagePage((p) => Math.max(1, p - 1))}
//                     >
//                       Prev
//                     </Button>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       className="h-6 px-2 text-[10px]"
//                       disabled={!packagesRes.pagination.hasNext}
//                       onClick={() => setPackagePage((p) => p + 1)}
//                     >
//                       Next
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               <p className="text-[10px] text-muted-foreground">
//                 Selected {selectedPackageIds.length} packages.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* 6. Eligible Users */}
//       <div className="rounded-xl border bg-card p-5 space-y-4">
//         <h3 className="text-sm font-semibold text-foreground tracking-tight">
//           User Eligibility
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-1.5">
//             <Label htmlFor="userType" className="text-xs font-semibold">
//               Eligible Users *
//             </Label>
//             <Controller
//               name="userType"
//               control={control}
//               render={({ field }) => (
//                 <Select value={field.value} onValueChange={field.onChange}>
//                   <SelectTrigger id="userType">
//                     <SelectValue placeholder="Select user type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="ALL_USERS">All Users</SelectItem>
//                     <SelectItem value="NEW_USERS">
//                       New Users (First Booking)
//                     </SelectItem>
//                     <SelectItem value="EXISTING_USERS">
//                       Existing Users
//                     </SelectItem>
//                     <SelectItem value="SELECTED_USERS">
//                       Selected Users
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//           </div>

//           {userType === 'SELECTED_USERS' && (
//             <div className="md:col-span-2 space-y-2.5">
//               <Label className="text-xs font-semibold">
//                 Select Eligible Users *
//               </Label>

//               {/* Selected users display */}
//               {selectedUsersDetails && selectedUsersDetails.length > 0 && (
//                 <div className="flex flex-wrap gap-1.5 p-2.5 border rounded-lg bg-muted/20">
//                   {selectedUsersDetails.map((user) => (
//                     <div
//                       key={user._id}
//                       className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-[10px] px-2.5 py-0.5 rounded-full border border-blue-200"
//                     >
//                       <span>{user.fullName}</span>
//                       <button
//                         type="button"
//                         onClick={() => toggleUser(user._id)}
//                         className="text-blue-500 hover:text-red-500 rounded-full cursor-pointer"
//                       >
//                         <X size={10} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <SearchInput
//                 placeholder="Search users by name, email or mobile..."
//                 value={userSearch}
//                 onChange={(val) => {
//                   setUserSearch(val)
//                   setUserPage(1)
//                 }}
//                 className="bg-muted/30 text-xs"
//                 debounceMs={600}
//               />

//               <div className="border rounded-lg max-h-48 overflow-y-auto p-2 bg-muted/10 space-y-1">
//                 {availableUsers.length === 0 ? (
//                   <p className="text-xs text-muted-foreground text-center py-4">
//                     No users match search.
//                   </p>
//                 ) : (
//                   availableUsers.map((user) => {
//                     const checked = selectedUserIds.includes(user._id)
//                     return (
//                       <div
//                         key={user._id}
//                         onClick={() => toggleUser(user._id)}
//                         className={cn(
//                           'flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer text-xs transition-colors hover:bg-muted/60 flex-row',
//                           checked
//                             ? 'bg-primary/5 text-primary font-medium'
//                             : '',
//                         )}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={checked}
//                           onChange={() => {}}
//                           className="rounded text-primary cursor-pointer"
//                         />
//                         <span>{user.fullName}</span>
//                         <span className="text-[10px] text-muted-foreground ml-auto bg-background px-1.5 py-0.5 rounded border font-mono">
//                           {user.mobile}
//                         </span>
//                       </div>
//                     )
//                   })
//                 )}
//               </div>

//               {/* User Pagination */}
//               {usersRes?.pagination && (
//                 <div className="flex items-center justify-between text-[11px] pt-1">
//                   <span className="text-muted-foreground">
//                     Page {usersRes.pagination.page} of{' '}
//                     {usersRes.pagination.totalPages || 1} (
//                     {usersRes.pagination.total} total)
//                   </span>
//                   <div className="flex items-center gap-1">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       className="h-6 px-2 text-[10px]"
//                       disabled={userPage <= 1}
//                       onClick={() => setUserPage((p) => Math.max(1, p - 1))}
//                     >
//                       Prev
//                     </Button>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       className="h-6 px-2 text-[10px]"
//                       disabled={!usersRes.pagination.hasNext}
//                       onClick={() => setUserPage((p) => p + 1)}
//                     >
//                       Next
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               <p className="text-[10px] text-muted-foreground">
//                 Selected {selectedUserIds.length} users.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t py-4 px-4 -mx-4 flex justify-end gap-3 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={onCancel}
//           disabled={isSubmitting}
//           className="cursor-pointer"
//         >
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           disabled={isSubmitting}
//           className="min-w-28 cursor-pointer"
//         >
//           {isSubmitting ? 'Saving...' : submitLabel}
//         </Button>
//       </div>
//     </form>
//   )
// }
import { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X, ImageIcon, Tag, Calendar, AlertCircle } from 'lucide-react'
import { SearchInput } from '@/components/SearchInput'
import { cn } from '@/lib/utils'
import { _axios } from '@/lib/axios'
import dayjs from 'dayjs'
export type CouponFormValues = {
  title: string
  description?: string
  couponCode: string
  bannerImage?: File
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT'
  discountValue: number
  minimumBookingAmount: number
  totalUsageLimit: number
  perUserUsageLimit: number
  applicableFor: 'ALL' | 'STANDARD' | 'CUSTOMIZED' | 'SELECTED'
  packageIds: string[]
  userType: 'ALL_USERS' | 'NEW_USERS' | 'EXISTING_USERS' | 'SELECTED_USERS'
  userIds: string[]
  validFrom: string
  validTo: string
  status: 'ACTIVE' | 'INACTIVE'
}

type Props = {
  defaultValues?: Partial<CouponFormValues>
  existingBannerImageUrl?: string
  onSubmit: (data: CouponFormValues) => void
  isSubmitting: boolean
  submitLabel: string
  onCancel: () => void
}

// ─── Error helpers ──────────────────────────────────────────────────────────

// Explicit red utilities (not a semantic `destructive` token) with `!important`
// so error styling reliably wins over the shadcn component's own default classes.
const errCls = (hasError?: boolean) => cn(hasError && '')

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="text-xs text-red-600 flex items-center gap-1">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {message}
    </p>
  )
}


function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <h3 className="text-sm font-semibold text-foreground tracking-tight">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  )
}

export function CouponForm({
  defaultValues,
  existingBannerImageUrl,
  onSubmit,
  isSubmitting,
  submitLabel,
  onCancel,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(
    existingBannerImageUrl || null,
  )
  const [packageSearch, setPackageSearch] = useState('')

  useEffect(() => {
    setImagePreview(existingBannerImageUrl || null)
  }, [existingBannerImageUrl])
  const [packagePage, setPackagePage] = useState(1)
  const [userSearch, setUserSearch] = useState('')
  const [userPage, setUserPage] = useState(1)

  // Fetch paginated packages
  const { data: packagesRes } = useQuery({
    queryKey: ['helper-packages', packageSearch, packagePage],
    queryFn: async () => {
      const res = await _axios.get('/coupon/helper/packages', {
        params: {
          page: String(packagePage),
          limit: '8',
          search: packageSearch,
          bookingType: 'STANDARD',
        },
      })
      return res.data as {
        data: {
          _id: string
          title: string
          destination: string
          packageType: string
          bookingType: string
        }[]
        pagination: {
          total: number
          page: number
          limit: number
          totalPages: number
          hasNext: boolean
        }
      }
    },
  })

  // Fetch paginated users
  const { data: usersRes } = useQuery({
    queryKey: ['helper-users', userSearch, userPage],
    queryFn: async () => {
      const res = await _axios.get('/coupon/helper/users', {
        params: { page: String(userPage), limit: '8', search: userSearch },
      })
      return res.data as {
        data: {
          _id: string
          fullName: string
          mobile: string
          email?: string
        }[]
        pagination: {
          total: number
          page: number
          limit: number
          totalPages: number
          hasNext: boolean
        }
      }
    },
  })

  const availablePackages = packagesRes?.data ?? []
  const availableUsers = usersRes?.data ?? []

  const formattedDefaultValues: any = {
    title: '',
    description: '',
    couponCode: '',
    discountType: 'PERCENTAGE',
    discountValue: 0,
    minimumBookingAmount: 0,
    totalUsageLimit: 1,
    perUserUsageLimit: 1,
    applicableFor: 'ALL',
    packageIds: [],
    userType: 'ALL_USERS',
    userIds: [],
    validFrom: '',
    validTo: '',
    status: 'ACTIVE',
    ...defaultValues,
  }

  // Format date default values from ISO to date inputs (YYYY-MM-DDThh:mm)
  if (defaultValues?.validFrom) {
    formattedDefaultValues.validFrom = dayjs(defaultValues.validFrom).format(
      'YYYY-MM-DDTHH:mm',
    )
  }
  if (defaultValues?.validTo) {
    formattedDefaultValues.validTo = dayjs(defaultValues.validTo).format(
      'YYYY-MM-DDTHH:mm',
    )
  }
  // if (defaultValues?.validFrom) {
  //   formattedDefaultValues.validFrom = new Date(defaultValues.validFrom).toISOString().slice(0, 16)
  // }
  // if (defaultValues?.validTo) {
  //   formattedDefaultValues.validTo = new Date(defaultValues.validTo).toISOString().slice(0, 16)
  // }

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CouponFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: formattedDefaultValues,
  })

  const discountType = watch('discountType')
  const applicableFor = watch('applicableFor')
  const userType = watch('userType')
  const selectedPackageIds = watch('packageIds') ?? []
  const selectedUserIds = watch('userIds') ?? []
  const validFrom = watch('validFrom')
  const totalUsageLimit = watch('totalUsageLimit')

  // Fetch details of selected packages (for lookup)
  const { data: selectedPackagesDetails } = useQuery({
    queryKey: ['selected-packages-details', selectedPackageIds],
    queryFn: async () => {
      if (!selectedPackageIds.length) return []
      const res = await _axios.get('/coupon/helper/packages', {
        params: {
          ids: JSON.stringify(selectedPackageIds),
          bookingType: 'STANDARD',
        },
      })
      return res.data?.data as {
        _id: string
        title: string
        destination: string
        packageType: string
        bookingType: string
      }[]
    },
    enabled: selectedPackageIds.length > 0,
  })

  // Fetch details of selected users (for lookup)
  const { data: selectedUsersDetails } = useQuery({
    queryKey: ['selected-users-details', selectedUserIds],
    queryFn: async () => {
      if (!selectedUserIds.length) return []
      const res = await _axios.get('/coupon/helper/users', {
        params: { ids: JSON.stringify(selectedUserIds) },
      })
      return res.data?.data as {
        _id: string
        fullName: string
        mobile: string
        email?: string
      }[]
    },
    enabled: selectedUserIds.length > 0,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue('bannerImage', file, { shouldValidate: true })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setValue('bannerImage', undefined, { shouldValidate: true })
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const togglePackage = (pkgId: string) => {
    const active = [...selectedPackageIds]
    const idx = active.indexOf(pkgId)
    if (idx > -1) {
      active.splice(idx, 1)
    } else {
      active.push(pkgId)
    }
    setValue('packageIds', active, { shouldValidate: true })
  }

  const toggleUser = (userId: string) => {
    const active = [...selectedUserIds]
    const idx = active.indexOf(userId)
    if (idx > -1) {
      active.splice(idx, 1)
    } else {
      active.push(userId)
    }
    setValue('userIds', active, { shouldValidate: true })
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-4xl pb-12"
      noValidate
    >
      {/* 1. Basic Details */}
      <Section title="Basic Coupon Information">
        <div className="space-y-1.5">
          <Label htmlFor="title" className={cn('text-xs font-semibold')}>
            Coupon Title *
          </Label>
          <Input
            id="title"
            placeholder="e.g. Special Holiday Sale"
            className={errCls(!!errors.title)}
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters',
              },
            })}
          />
          <FieldError message={errors.title?.message} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="couponCode" className={cn('text-xs font-semibold')}>
            Coupon Code *
          </Label>
          <div className="relative">
            <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="couponCode"
              placeholder="e.g. SUMMER500"
              className={cn(
                'pl-9 font-mono font-semibold',
                errCls(!!errors.couponCode),
              )}
              {...register('couponCode', {
                required: 'Coupon code is required',
                minLength: { value: 3, message: 'Min 3 characters' },
                pattern: {
                  value: /^[A-Z0-9]+$/,
                  message: 'Only uppercase letters and numbers allowed',
                },
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase()
                },
              })}
            />
          </div>
          <FieldError message={errors.couponCode?.message} />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <Label htmlFor="description" className="text-xs font-semibold">
            Coupon Description
          </Label>
          <Textarea
            id="description"
            rows={3}
            placeholder="Write a brief description of the offer terms, limitations, and eligibility..."
            className={errCls(!!errors.description)}
            {...register('description', {
              maxLength: {
                value: 500,
                message: 'Description must be under 500 characters',
              },
            })}
          />
          <FieldError message={errors.description?.message} />
        </div>
      </Section>

      {/* 2. Banner Upload */}
      <div className="rounded-xl border bg-card p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">
          Coupon Banner Image
        </h3>
        <Controller
          name="bannerImage"
          control={control}
          rules={{
            validate: (file) =>
              file || imagePreview ? true : 'Banner image is required',
          }}
          render={() => (
            <div className="flex flex-col md:flex-row gap-5 items-start">
              <div
                className={cn(
                  'w-full md:w-96 aspect-[21/9] rounded-lg border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden bg-muted/40 transition-colors',
                  imagePreview ? 'border-none' : 'hover:border-primary/50',
                  errors.bannerImage &&
                    !imagePreview &&
                    'border-red-500 bg-red-50',
                )}
              >
                {imagePreview ? (
                  <>
                    <img
                      src={
                        imagePreview.startsWith('data:') ||
                        imagePreview.startsWith('blob:') ||
                        imagePreview.startsWith('http://') ||
                        imagePreview.startsWith('https://')
                          ? imagePreview
                          : `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api/V1'}/../uploads/coupons/banners/${imagePreview}`
                      }
                      className="w-full h-full object-cover"
                      alt="Coupon Banner"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors shadow-md"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 cursor-pointer p-4"
                  >
                    <div
                      className={cn(
                        'p-3 rounded-full bg-background border shadow-sm',
                        errors.bannerImage && 'border-red-300',
                      )}
                    >
                      <ImageIcon
                        className={cn(
                          'w-5 h-5 text-muted-foreground',
                          errors.bannerImage && 'text-red-500',
                        )}
                      />
                    </div>
                    <div className="text-center">
                      <span
                        className={cn(
                          'text-xs font-semibold text-primary',
                          errors.bannerImage && 'text-red-600',
                        )}
                      >
                        Upload banner image
                      </span>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Recommended ratio 21:9 (e.g. 1200x514px)
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          )}
        />
        <FieldError
          message={errors.bannerImage?.message as string | undefined}
        />
      </div>

      {/* 3. Discount Setup */}
      <Section title="Discount Configuration">
        <div className="space-y-1.5">
          <Label htmlFor="discountType" className="text-xs font-semibold">
            Discount Type *
          </Label>
          <Controller
            name="discountType"
            control={control}
            rules={{ required: 'Discount type is required' }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="discountType"
                  className={cn('w-full', errCls(!!errors.discountType))}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                  <SelectItem value="FIXED_AMOUNT">Fixed Amount (₹)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.discountType?.message} />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="discountValue"
            className={cn('text-xs font-semibold')}
          >
            Discount Value *
          </Label>
          <Input
            id="discountValue"
            type="number"
            min={0}
            step="any"
            placeholder={discountType === 'PERCENTAGE' ? 'e.g. 10' : 'e.g. 500'}
            className={errCls(!!errors.discountValue)}
            {...register('discountValue', {
              required: 'Discount value is required',
              valueAsNumber: true,
              min: { value: 0.01, message: 'Must be greater than 0' },
              validate: (v) => {
                if (v == null || Number.isNaN(v)) return true
                if (discountType === 'PERCENTAGE' && v > 100) {
                  return 'Percentage cannot exceed 100'
                }
                return true
              },
            })}
          />
          <FieldError message={errors.discountValue?.message} />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="minimumBookingAmount"
            className={cn('text-xs font-semibold')}
          >
            Minimum Booking Amount (₹) *
          </Label>
          <Input
            id="minimumBookingAmount"
            type="number"
            min={0}
            placeholder="e.g. 5000"
            className={errCls(!!errors.minimumBookingAmount)}
            {...register('minimumBookingAmount', {
              required: 'Minimum booking amount is required',
              valueAsNumber: true,
              min: { value: 0, message: 'Must be ≥ 0' },
            })}
          />
          <FieldError message={errors.minimumBookingAmount?.message} />
        </div>
      </Section>

      {/* 4. Limits & Validity */}
      <Section title="Limits & Validity">
        <div className="space-y-1.5">
          <Label
            htmlFor="totalUsageLimit"
            className={cn('text-xs font-semibold')}
          >
            Total Usage Limit (All Users) *
          </Label>
          <Input
            id="totalUsageLimit"
            type="number"
            min={1}
            placeholder="e.g. 100"
            className={errCls(!!errors.totalUsageLimit)}
            {...register('totalUsageLimit', {
              required: 'Total usage limit is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Min 1' },
            })}
          />
          <FieldError message={errors.totalUsageLimit?.message} />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="perUserUsageLimit"
            className={cn('text-xs font-semibold')}
          >
            Usage Limit Per User *
          </Label>
          <Input
            id="perUserUsageLimit"
            type="number"
            min={1}
            placeholder="e.g. 1"
            className={errCls(!!errors.perUserUsageLimit)}
            {...register('perUserUsageLimit', {
              required: 'Per user usage limit is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Min 1' },
              validate: (v) => {
                if (v == null || Number.isNaN(v)) return true
                if (totalUsageLimit != null && v > totalUsageLimit) {
                  return 'Cannot exceed total usage limit'
                }
                return true
              },
            })}
          />
          <FieldError message={errors.perUserUsageLimit?.message} />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="validFrom"
            className={cn(
              'text-xs font-semibold flex items-center gap-1 flex-row',
            )}
          >
            <Calendar className="w-3.5 h-3.5" /> Valid From *
          </Label>
          <Input
            id="validFrom"
            type="datetime-local"
            className={errCls(!!errors.validFrom)}
            {...register('validFrom', {
              required: 'Start validity date is required',
            })}
          />
          <FieldError message={errors.validFrom?.message} />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="validTo"
            className={cn(
              'text-xs font-semibold flex items-center gap-1 flex-row',
            )}
          >
            <Calendar className="w-3.5 h-3.5" /> Valid To *
          </Label>
          <Input
            id="validTo"
            type="datetime-local"
            className={errCls(!!errors.validTo)}
            {...register('validTo', {
              required: 'End validity date is required',
              validate: (v) => {
                if (!v || !validFrom) return true
                return (
                  new Date(v) > new Date(validFrom) ||
                  'End date must be after start date'
                )
              },
            })}
          />
          <FieldError message={errors.validTo?.message} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="status" className="text-xs font-semibold">
            Coupon Status *
          </Label>
          <Controller
            name="status"
            control={control}
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="status"
                  className={cn('w-full', errCls(!!errors.status))}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.status?.message} />
        </div>
      </Section>

      {/* 5. Applicability Controls */}
      <div className="rounded-xl border bg-card p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">
          Package applicability
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="applicableFor" className="text-xs font-semibold">
              Applicable Packages *
            </Label>
            <Controller
              name="applicableFor"
              control={control}
              rules={{ required: 'Applicability is required' }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="applicableFor"
                    className={cn('w-full', errCls(!!errors.applicableFor))}
                  >
                    <SelectValue placeholder="Select applicability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Packages</SelectItem>
                    <SelectItem value="STANDARD">
                      Standard Packages Only
                    </SelectItem>
                    <SelectItem value="SELECTED">Selected Packages</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError message={errors.applicableFor?.message} />
          </div>

          {applicableFor === 'SELECTED' && (
            <Controller
              name="packageIds"
              control={control}
              rules={{
                validate: (value) =>
                  applicableFor !== 'SELECTED' ||
                  (value && value.length > 0) ||
                  'Select at least one package',
              }}
              render={() => (
                <div className={cn('md:col-span-2 space-y-2.5 rounded-lg')}>
                  <Label
                    className={cn(
                      'text-xs font-semibold',
                      errors.packageIds && 'text-red-600',
                    )}
                  >
                    Select Applicable Packages *
                  </Label>

                  {/* Selected packages display */}
                  {selectedPackagesDetails &&
                    selectedPackagesDetails.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 p-2.5 border rounded-lg bg-muted/20">
                        {selectedPackagesDetails.map((pkg) => (
                          <div
                            key={pkg._id}
                            className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-[10px] px-2.5 py-0.5 rounded-full border border-blue-200"
                          >
                            <span>{pkg.title}</span>
                            <button
                              type="button"
                              onClick={() => togglePackage(pkg._id)}
                              className="text-blue-500 hover:text-red-500 rounded-full cursor-pointer"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                  <SearchInput
                    placeholder="Search packages by title or destination..."
                    value={packageSearch}
                    onChange={(val) => {
                      setPackageSearch(val)
                      setPackagePage(1)
                    }}
                    className="bg-muted/30 text-xs"
                    debounceMs={600}
                  />

                  <div
                    className={cn(
                      'border rounded-lg max-h-48 overflow-y-auto p-2 bg-muted/10 space-y-1',
                      errors.packageIds && 'border-red-300',
                    )}
                  >
                    {availablePackages.length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-4">
                        No packages match search.
                      </p>
                    ) : (
                      availablePackages.map((pkg) => {
                        const checked = selectedPackageIds.includes(pkg._id)
                        return (
                          <div
                            key={pkg._id}
                            onClick={() => togglePackage(pkg._id)}
                            className={cn(
                              'flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer text-xs transition-colors hover:bg-muted/60 flex-row',
                              checked
                                ? 'bg-primary/5 text-primary font-medium'
                                : '',
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {}}
                              className="rounded text-primary cursor-pointer"
                            />
                            <span>{pkg.title}</span>
                            <span className="text-[10px] text-muted-foreground ml-auto bg-background px-1.5 py-0.5 rounded border">
                              {pkg.destination} ({pkg.bookingType})
                            </span>
                          </div>
                        )
                      })
                    )}
                  </div>

                  {/* Package Pagination */}
                  {packagesRes?.pagination && (
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-muted-foreground">
                        Page {packagesRes.pagination.page} of{' '}
                        {packagesRes.pagination.totalPages || 1} (
                        {packagesRes.pagination.total} total)
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-[10px]"
                          disabled={packagePage <= 1}
                          onClick={() =>
                            setPackagePage((p) => Math.max(1, p - 1))
                          }
                        >
                          Prev
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-[10px]"
                          disabled={!packagesRes.pagination.hasNext}
                          onClick={() => setPackagePage((p) => p + 1)}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}

                  <p className="text-[10px] text-muted-foreground">
                    Selected {selectedPackageIds.length} packages.
                  </p>
                  <FieldError
                    message={errors.packageIds?.message as string | undefined}
                  />
                </div>
              )}
            />
          )}
        </div>
      </div>

      {/* 6. Eligible Users */}
      <div className="rounded-xl border bg-card p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">
          User Eligibility
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="userType" className="text-xs font-semibold">
              Eligible Users *
            </Label>
            <Controller
              name="userType"
              control={control}
              rules={{ required: 'User eligibility is required' }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="userType"
                    className={cn('w-full', errCls(!!errors.userType))}
                  >
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL_USERS">All Users</SelectItem>
                    <SelectItem value="NEW_USERS">
                      New Users (First Booking)
                    </SelectItem>
                    <SelectItem value="EXISTING_USERS">
                      Existing Users
                    </SelectItem>
                    <SelectItem value="SELECTED_USERS">
                      Selected Users
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError message={errors.userType?.message} />
          </div>

          {userType === 'SELECTED_USERS' && (
            <Controller
              name="userIds"
              control={control}
              rules={{
                validate: (value) =>
                  userType !== 'SELECTED_USERS' ||
                  (value && value.length > 0) ||
                  'Select at least one user',
              }}
              render={() => (
                <div className={cn('md:col-span-2 space-y-2.5 rounded-lg')}>
                  <Label className={cn('text-xs font-semibold')}>
                    Select Eligible Users *
                  </Label>

                  {/* Selected users display */}
                  {selectedUsersDetails && selectedUsersDetails.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 p-2.5 border rounded-lg bg-muted/20">
                      {selectedUsersDetails.map((user) => (
                        <div
                          key={user._id}
                          className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-[10px] px-2.5 py-0.5 rounded-full border border-blue-200"
                        >
                          <span>{user.fullName}</span>
                          <button
                            type="button"
                            onClick={() => toggleUser(user._id)}
                            className="text-blue-500 hover:text-red-500 rounded-full cursor-pointer"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <SearchInput
                    placeholder="Search users by name, email or mobile..."
                    value={userSearch}
                    onChange={(val) => {
                      setUserSearch(val)
                      setUserPage(1)
                    }}
                    className="bg-muted/30 text-xs"
                    debounceMs={600}
                  />

                  <div
                    className={cn(
                      'border rounded-lg max-h-48 overflow-y-auto p-2 bg-muted/10 space-y-1',
                      errors.userIds && 'border-red-300',
                    )}
                  >
                    {availableUsers.length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-4">
                        No users match search.
                      </p>
                    ) : (
                      availableUsers.map((user) => {
                        const checked = selectedUserIds.includes(user._id)
                        return (
                          <div
                            key={user._id}
                            onClick={() => toggleUser(user._id)}
                            className={cn(
                              'flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer text-xs transition-colors hover:bg-muted/60 flex-row',
                              checked
                                ? 'bg-primary/5 text-primary font-medium'
                                : '',
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {}}
                              className="rounded text-primary cursor-pointer"
                            />
                            <span>{user.fullName}</span>
                            <span className="text-[10px] text-muted-foreground ml-auto bg-background px-1.5 py-0.5 rounded border font-mono">
                              {user.mobile}
                            </span>
                          </div>
                        )
                      })
                    )}
                  </div>

                  {/* User Pagination */}
                  {usersRes?.pagination && (
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-muted-foreground">
                        Page {usersRes.pagination.page} of{' '}
                        {usersRes.pagination.totalPages || 1} (
                        {usersRes.pagination.total} total)
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-[10px]"
                          disabled={userPage <= 1}
                          onClick={() => setUserPage((p) => Math.max(1, p - 1))}
                        >
                          Prev
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-[10px]"
                          disabled={!usersRes.pagination.hasNext}
                          onClick={() => setUserPage((p) => p + 1)}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}

                  <p className="text-[10px] text-muted-foreground">
                    Selected {selectedUserIds.length} users.
                  </p>
                  <FieldError
                    message={errors.userIds?.message as string | undefined}
                  />
                </div>
              )}
            />
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t py-4 px-4 -mx-4 flex justify-end gap-3 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-28 cursor-pointer"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
