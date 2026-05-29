// ─── Throttle Utility ─────────────────────────────────────────────────────────
// Limits how often a function fires.
// Used on mousemove across all cursor hooks to cap at ~60fps (16ms).
// Without this, every pixel of movement triggers a re-render.

export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle = false

    return function (this: any, ...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}