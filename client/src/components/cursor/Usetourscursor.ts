import { useCallback, useEffect, useRef, useState } from "react"
import type { MousePosition, TrailPoint } from "./cusror.types"
import { throttle } from "./throttle"

// ─── useToursCursor ───────────────────────────────────────────────────────────
// Logic for the International Tours page cursor.
//
// What it tracks:
//   • mousePos      — exact X/Y to position the plane SVG
//   • angle         — direction the mouse is moving → rotates the plane to face it
//   • isHovered     — true when over a link/button → ring expands
//   • trail         — last 8 positions → rendered as cloud puff circles behind plane
//
// Trail behaviour:
//   Adds a new point only when mouse moves >4px (avoids stacking puffs when still).
//   Each point carries the movement angle so puffs can be offset slightly.
//   Points are removed one-by-one every 130ms creating a dissolving contrail.

export function useToursCursor() {
    const [mousePos, setMousePos] = useState<MousePosition>({ x: -200, y: -200 })
    const [angle, setAngle] = useState(-45)   // -45 = plane points up-right at rest
    const [isHovered, setIsHovered] = useState(false)
    const [trail, setTrail] = useState<TrailPoint[]>([])

    const prevPosRef = useRef<MousePosition>({ x: 0, y: 0 })
    const trailIdRef = useRef(0)

    // ── Mouse move ──────────────────────────────────────────────────────────────
    const handleMouseMove = useCallback(
        throttle((e: MouseEvent) => {
            const x = e.clientX
            const y = e.clientY

            const dx = e.movementX || x - prevPosRef.current.x
            const dy = e.movementY || y - prevPosRef.current.y

            setMousePos({ x, y })

            // Plane rotation: atan2 gives movement direction in degrees.
            // -45 offset aligns the SVG nose with the travel direction.
            if (dx !== 0 || dy !== 0) {
                setAngle(Math.atan2(dy, dx) * (180 / Math.PI) - 45)
            }

            // Add trail point only when mouse moves meaningfully
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance > 4) {
                setTrail((prev) => {
                    const pt: TrailPoint = {
                        id: ++trailIdRef.current,
                        x,
                        y,
                        angle: Math.atan2(dy, dx) * (180 / Math.PI),
                    }
                    return [...prev.slice(-7), pt] // keep last 8
                })
            }

            prevPosRef.current = { x, y }
        }, 16),
        []
    )

    // ── Trail fade-out ──────────────────────────────────────────────────────────
    // Removes the oldest trail point every 130ms → contrail dissolves behind plane
    useEffect(() => {
        if (trail.length === 0) return
        const t = setTimeout(() => setTrail((prev) => prev.slice(1)), 130)
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

    return { mousePos, angle, isHovered, trail }
}