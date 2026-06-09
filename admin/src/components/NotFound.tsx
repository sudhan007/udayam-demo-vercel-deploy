// app/routes/__not-found.tsx
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Home, LayoutDashboard } from 'lucide-react'

export function NotFound() {
  return (
    <div
      className="min-h-[95dvh] flex items-center justify-center p-5"
      style={{
        background:
          'linear-gradient(135deg, #0f172a 0%, #1e2937 50%, #0f172a 100%)',
      }}
    >
      {/* Subtle accent glow */}
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative text-center space-y-8 z-10">
        {/* 404 */}
        <h1
          className="text-[10rem] leading-none font-black select-none tracking-tighter"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(245, 158, 11, 0.25)',
          }}
        >
          404
        </h1>

        {/* Gold/Amber divider */}
        <div
          className="mx-auto h-px w-28"
          style={{
            background:
              'linear-gradient(90deg, transparent, #f59e0b, transparent)',
          }}
        />

        {/* Content */}
        <div className="space-y-3">
          <p className="text-3xl font-bold text-white tracking-wide">
            Page Not Found
          </p>
          <p
            className="text-base max-w-sm mx-auto leading-relaxed"
            style={{ color: 'rgba(245, 158, 11, 0.75)' }}
          >
            The page you're looking for doesn't exist or has been moved. Let's
            get you back to exploring amazing destinations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            asChild
            size="lg"
            className="gap-2 font-semibold text-sm px-8 py-6 rounded-xl"
            style={{
              background: '#f59e0b',
              color: '#0f172a',
              border: 'none',
              fontWeight: 600,
            }}
          >
            <Link to="/">
              <LayoutDashboard className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 font-semibold text-sm px-8 py-6 rounded-xl"
            style={{
              background: 'transparent',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              color: '#e2e8f0',
            }}
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
