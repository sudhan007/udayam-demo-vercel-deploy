import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { _axios } from '@/lib/axios'
import {
  TrendingUp,
  Users,
  DollarSign,
  Briefcase,
  Calendar,
  Eye,
  ArrowUpRight,
  Tag,
  Sparkles,
  Map,
  PlaneTakeoff,
  Compass,
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget
      .closest('.chart-container')
      ?.getBoundingClientRect()
    if (rect) {
      setTooltipPos({
        x: e.clientX - rect.left + 12,
        y: e.clientY - rect.top - 12,
      })
    }
  }

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tourism-dashboard-stats'],
    queryFn: async () => {
      const res = await _axios.get('/tourism/dashboard')
      return res.data.data
    },
  })

  // Format helper functions
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val || 0)
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'BOOKED':
      case 'CONFIRMED':
      case 'PAYMENT_SUCCESS':
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'ENQUIRY_RECEIVED':
      case 'UNDER_REVIEW':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'QUOTATION_SHARED':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'PAYMENT_PENDING':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'CANCELLED':
      case 'ENQUIRY_CANCELLED':
      case 'PAYMENT_FAILED':
        return 'bg-rose-50 text-rose-600 border-rose-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded-lg" />
          <div className="h-4 w-72 bg-muted/60 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-muted/50 rounded-2xl border" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-96 bg-muted/50 rounded-2xl border lg:col-span-1" />
          <div className="h-96 bg-muted/50 rounded-2xl border lg:col-span-2" />
        </div>
      </div>
    )
  }

  if (isError || !stats) {
    return (
      <div className="p-8">
        <div className="p-4 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 flex items-center gap-3">
          <span>⚠️</span>
          <div>
            <h4 className="font-semibold">Error Loading Dashboard</h4>
            <p className="text-sm text-rose-500">
              Failed to fetch tourism dashboard statistics. Please refresh the
              page or contact support.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const kpis = stats.kpis || {
    totalBookings: 0,
    totalRevenue: 0,
    totalUsers: 0,
    activePackages: 0,
  }
  const pieData = stats.pieChart || {
    domestic: 0,
    international: 0,
    standard: 0,
    customized: 0,
  }
  const recentBookings = stats.recentBookings || []

  // Prepare chart data
  const chartCategories = [
    {
      name: 'Domestic Packages',
      value: pieData.domestic,
      color: '#3B82F6',
      icon: <Map className="w-4 h-4 text-blue-500" />,
    },
    {
      name: 'International Packages',
      value: pieData.international,
      color: '#10B981',
      icon: <PlaneTakeoff className="w-4 h-4 text-emerald-500" />,
    },
    {
      name: 'Standard Packages',
      value: pieData.standard,
      color: '#8B5CF6',
      icon: <Tag className="w-4 h-4 text-violet-500" />,
    },
    {
      name: 'Customized Packages',
      value: pieData.customized,
      color: '#F59E0B',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
    },
  ]

  const chartTotal =
    chartCategories.reduce((sum, item) => sum + item.value, 0) || 1

  // SVG parameters for doughnut
  const radius = 50
  const strokeWidth = 14
  const circumference = 2 * Math.PI * radius
  let accumulatedOffset = 0

  return (
    <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIStatCard
          title="Total Bookings"
          value={kpis.totalBookings}
          icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
          bgColor="bg-blue-50"
          borderColor="border-blue-100"
          description="Successful bookings count"
        />
        <KPIStatCard
          title="Total Revenue"
          value={formatCurrency(kpis.totalRevenue)}
          icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
          bgColor="bg-emerald-50"
          borderColor="border-emerald-100"
          description="Processed successful payments"
        />
        <KPIStatCard
          title="Total Users"
          value={kpis.totalUsers}
          icon={<Users className="w-5 h-5 text-violet-600" />}
          bgColor="bg-violet-50"
          borderColor="border-violet-100"
          description="Registered user accounts"
        />
        <KPIStatCard
          title="Active Packages"
          value={kpis.activePackages}
          icon={<Compass className="w-5 h-5 text-amber-600" />}
          bgColor="bg-amber-50"
          borderColor="border-amber-100"
          description="Public tourism packages"
        />
      </div>

      {/* Charts & Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Doughnut Chart Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between lg:col-span-1 chart-container relative">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Bookings by Package Type
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Distribution of successful bookings
            </p>
          </div>

          <div className="relative flex items-center justify-center my-6">
            <svg
              width="180"
              height="180"
              viewBox="0 0 160 160"
              className="transform -rotate-90"
            >
              {chartCategories.map((cat, idx) => {
                if (cat.value === 0) return null
                const strokeLength = (cat.value / chartTotal) * circumference
                const strokeOffset = -accumulatedOffset
                accumulatedOffset += strokeLength

                const isHovered = hoveredSlice === idx

                return (
                  <circle
                    key={cat.name}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke={cat.color}
                    strokeWidth={isHovered ? strokeWidth + 2 : strokeWidth}
                    strokeDasharray={`${strokeLength} ${circumference}`}
                    strokeDashoffset={strokeOffset}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredSlice(idx)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                )
              })}

              {/* Central text displaying total or hovered info */}
              <g className="transform rotate-90 translate-y-[160px] origin-center">
                <text
                  x="80"
                  y="75"
                  textAnchor="middle"
                  className="text-2xl font-bold font-sans fill-slate-900"
                >
                  {hoveredSlice !== null
                    ? chartCategories[hoveredSlice].value
                    : kpis.totalBookings}
                </text>
                <text
                  x="80"
                  y="92"
                  textAnchor="middle"
                  className="text-[9px] font-bold font-sans fill-slate-400 uppercase tracking-widest"
                >
                  {hoveredSlice !== null
                    ? chartCategories[hoveredSlice].name.split(' ')[0]
                    : 'Total Bookings'}
                </text>
              </g>
            </svg>
          </div>

          {/* Floating Tooltip */}
          {hoveredSlice !== null && (
            <div
              className="absolute pointer-events-none bg-slate-900/90 text-white text-xs px-3 py-2 rounded-xl shadow-xl flex flex-col gap-0.5 border border-slate-700/50 backdrop-blur-sm z-50 transition-all duration-75 whitespace-nowrap"
              style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
            >
              <div className="flex items-center gap-1.5 font-bold">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: chartCategories[hoveredSlice].color,
                  }}
                />
                <span>{chartCategories[hoveredSlice].name}</span>
              </div>
              <div className="text-[10px] text-slate-300 font-semibold font-mono pl-3.5">
                Bookings: {chartCategories[hoveredSlice].value} (
                {chartTotal > 0
                  ? Math.round(
                      (chartCategories[hoveredSlice].value / chartTotal) * 100,
                    )
                  : 0}
                %)
              </div>
            </div>
          )}

          {/* Chart Legends */}
          <div className="space-y-2.5">
            {chartCategories.map((cat, idx) => {
              const percentage =
                chartTotal > 0 ? Math.round((cat.value / chartTotal) * 100) : 0
              const isHovered = hoveredSlice === idx

              return (
                <div
                  key={cat.name}
                  className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
                    isHovered
                      ? 'bg-slate-50 border border-slate-100'
                      : 'border border-transparent'
                  }`}
                  onMouseEnter={() => setHoveredSlice(idx)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-800">
                    {cat.value} ({percentage}%)
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Recent Bookings Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between lg:col-span-2">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Bookings
                </h2>
              </div>
              {/* <Link to="/bookings">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs gap-1 cursor-pointer"
                >
                  View All <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </Link> */}
            </div>

            <div className="mt-4 border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/70 hover:bg-slate-50/70">
                    <TableHead className="font-semibold text-slate-600 text-xs py-3">
                      Booking #
                    </TableHead>
                    <TableHead className="font-semibold text-slate-600 text-xs py-3">
                      Package & Pax
                    </TableHead>
                    <TableHead className="font-semibold text-slate-600 text-xs py-3">
                      Customer
                    </TableHead>
                    <TableHead className="font-semibold text-slate-600 text-xs py-3">
                      Travel Date
                    </TableHead>
                    <TableHead className="font-semibold text-slate-600 text-xs py-3">
                      Price / Quote
                    </TableHead>
                    <TableHead className="font-semibold text-slate-600 text-xs py-3">
                      Status
                    </TableHead>
                    <TableHead className="w-16 text-right py-3"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-12 text-slate-400 italic"
                      >
                        No bookings found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentBookings.map((booking: any) => (
                      <TableRow
                        key={booking._id}
                        className="hover:bg-slate-50/30 group"
                      >
                        {/* Booking Number */}
                        <TableCell className="font-mono text-xs font-bold py-3 text-slate-700">
                          <div className="space-y-0.5">
                            <span className="text-primary">
                              {booking.bookingNumber}
                            </span>
                            <div className="flex items-center gap-1">
                              {booking.bookingType === 'CUSTOMIZED' ? (
                                <span className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.2 bg-purple-50 text-purple-700 rounded border border-purple-100 font-bold uppercase">
                                  <Sparkles size={8} /> Custom
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded border border-emerald-100 font-bold uppercase">
                                  <Tag size={8} /> Standard
                                </span>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        {/* Package Info */}
                        <TableCell className="py-3">
                          <div className="text-xs font-semibold text-slate-700 max-w-[150px] truncate">
                            {booking.packageId?.title || 'Tour Package'}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            👥 {booking.travellerInfo?.numberOfPersons || 1} Pax
                          </div>
                        </TableCell>

                        {/* Customer */}
                        <TableCell className="py-3">
                          <div className="text-xs font-semibold text-slate-700">
                            {booking.travellerInfo?.fullName}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {booking.travellerInfo?.mobileNumber}
                          </div>
                        </TableCell>

                        {/* Travel Date */}
                        <TableCell className="py-3 text-xs text-slate-500 font-medium whitespace-nowrap">
                          {formatDate(booking.travellerInfo?.travelDate)}
                        </TableCell>

                        {/* Price */}
                        <TableCell className="py-3 font-semibold text-slate-800 text-xs">
                          {booking.bookingType === 'STANDARD' ? (
                            <span>
                              {formatCurrency(
                                booking.pricingDetails?.finalAmount,
                              )}
                            </span>
                          ) : booking.quotation?.amount ? (
                            <span className="text-blue-700">
                              {formatCurrency(booking.quotation.amount)}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded">
                              Pending
                            </span>
                          )}
                        </TableCell>

                        {/* Status Badge */}
                        <TableCell className="py-3">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold border uppercase whitespace-nowrap ${getStatusBadgeStyle(
                              booking.status,
                            )}`}
                          >
                            {booking.status.replace(/_/g, ' ')}
                          </span>
                        </TableCell>

                        {/* Action Link */}
                        <TableCell className="py-3 text-right">
                          <Link
                            to="/bookings/$id"
                            params={{ id: booking._id }}
                            search={{ type: booking.bookingType }}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-lg hover:bg-slate-100 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-700" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KPIStatCard({
  title,
  value,
  icon,
  bgColor,
  borderColor,
  description,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  bgColor: string
  borderColor: string
  description: string
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
          {value}
        </h3>
        <p className="text-[10px] text-slate-400 mt-1 font-medium">
          {description}
        </p>
      </div>
      <div
        className={`p-3 rounded-xl ${bgColor} border ${borderColor} shadow-inner`}
      >
        {icon}
      </div>
    </div>
  )
}
