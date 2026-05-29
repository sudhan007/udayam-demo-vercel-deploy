import { useCallback, useEffect, useRef, useState } from "react"
import type { MousePosition, TrailPoint } from "./cusror.types"
import { throttle } from "./throttle"

// ─── useEducationCursor ───────────────────────────────────────────────────────
// Logic for the Foreign Education page cursor.
//
// What it tracks:
//   • mousePos      — exact X/Y to position the mortarboard SVG
//   • isHovered     — true when over a link/button → diamond ring expands
//   • trail         — last 10 positions with angle → rendered as pencil strokes
//
// Trail behaviour:
//   Adds a point when mouse moves >6px. Each point stores the movement angle.
//   The component renders them as thin vertical rectangles rotated to that angle,
//   creating short pencil-stroke marks as if writing across the page.
//   Points removed every 100ms → strokes fade quickly, like chalk being erased.

export function useEducationCursor() {
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

            // Slightly higher threshold than other cursors (6px) so strokes
            // only appear when there's definite directional movement — otherwise
            // strokes stack up and look like a blob instead of individual marks.
            if (distance > 6) {
                setTrail((prev) => {
                    const pt: TrailPoint = {
                        id: ++trailIdRef.current,
                        x,
                        y,
                        // +90 rotates the stroke perpendicular to movement direction,
                        // so it looks like a pen nib dragging across paper
                        angle: Math.atan2(dy, dx) * (180 / Math.PI) + 90,
                    }
                    return [...prev.slice(-9), pt] // keep last 10
                })
            }

            prevPosRef.current = { x, y }
        }, 16),
        []
    )

    // ── Trail fade-out ──────────────────────────────────────────────────────────
    // 100ms removal = strokes disappear quickly like chalk marks being erased
    useEffect(() => {
        if (trail.length === 0) return
        const t = setTimeout(() => setTrail((prev) => prev.slice(1)), 100)
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