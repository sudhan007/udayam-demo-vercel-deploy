import { useCallback, useEffect, useRef, useState } from "react"
import type { MousePosition, TrailPoint } from "./cusror.types"
import { throttle } from "./throttle"

// ─── useMedicalCursor ─────────────────────────────────────────────────────────
// Logic for the Medical Tourism page cursor.
//
// What it tracks:
//   • mousePos      — exact X/Y to position the stethoscope SVG + pulse rings
//   • isHovered     — true when over a link/button → rings deepen in colour
//   • trail         — last 6 positions → rendered as small fading green dots
//
// Trail behaviour:
//   Adds a point when mouse moves >5px.
//   Points removed every 120ms → short dissolving dot-trail like a heartbeat path.
//   No angle stored — dots are simple circles, direction doesn't matter.

export function useMedicalCursor() {
    const [mousePos, setMousePos] = useState<MousePosition>({ x: -200, y: -200 })
    const [isHovered, setIsHovered] = useState(false)
    const [trail, setTrail] = useState<TrailPoint[]>([])

    const prevPosRef = useRef<MousePosition>({ x: 0, y: 0 })
    const trailIdRef = useRef(0)

    // ── Mouse move ──────────────────────────────────────────────────────────────
    const handleMouseMove = useCallback(
        throttle((e: MouseEvent) => {
            const x = e.clientX
            const y = e.clientY

            setMousePos({ x, y })

            const dx = x - prevPosRef.current.x
            const dy = y - prevPosRef.current.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Only add trail point when mouse moves meaningfully (avoids dot pile-up)
            if (distance > 5) {
                setTrail((prev) => {
                    const pt: TrailPoint = { id: ++trailIdRef.current, x, y }
                    return [...prev.slice(-5), pt] // keep last 6
                })
            }

            prevPosRef.current = { x, y }
        }, 16),
        []
    )

    // ── Trail fade-out ──────────────────────────────────────────────────────────
    // Removes oldest dot every 120ms → short dissolving tail
    useEffect(() => {
        if (trail.length === 0) return
        const t = setTimeout(() => setTrail((prev) => prev.slice(1)), 120)
        return () => clearTimeout(t)
    }, [trail])

    // ── Hover detection ─────────────────────────────────────────────────────────
    useEffect(() => {
        const els = document.querySelectorAll("a, button, .vc, .vcard, .tcard, .acard, .tc, .tcm")
        const onEnter = () => setIsHovered(true)
        const onLeave = () => setIsHovered(false)
        els.forEach((el) => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave) })
        return () => els.forEach((el) => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave) })
    }, [])

    // ── Mount/unmount listener ───────────────────────────────────────────────────
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [handleMouseMove])

    return { mousePos, isHovered, trail }
}