// ─── ToursCursor ──────────────────────────────────────────────────────────────
// Drop this at the top of your International Tours page JSX.
// Renders two layers:
//
//   Layer 1 (z-99990) — Cloud puff trail  — soft circles fading behind the plane
//   Layer 2 (z-99999) — Plane SVG         — rotates to face movement direction
//
// No ring — just the plane + contrail for a clean, uncluttered look.

import { PlaneSVG } from "./Planesvg"
import { useToursCursor } from "./Usetourscursor"

export const ToursCursor = () => {
  const { mousePos, angle, isHovered, trail } = useToursCursor()

  return (
    <>
      {/* ── Layer 1: Cloud puff trail ────────────────────────────────────────
          Each puff is one past mouse position rendered as a soft circle.
          Size and opacity grow from oldest → newest point.
          Oldest point removed every 130ms by the hook → contrail dissolves. */}
      {trail.map((pt, i) => {
        const progress = (i + 1) / trail.length // 0 (oldest) → 1 (newest)
        const size = 6 + progress * 14 // 6px → 20px
        const opacity = progress * 0.35 // 0 → 0.35

        return (
          <div
            key={pt.id}
            className="pointer-events-none fixed z-[99990]"
            style={{
              left: pt.x,
              top: pt.y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: "rgba(27,43,107,0.4)",
              transform: "translate(-50%, -50%)",
              opacity,
            }}
          />
        )
      })}

      {/* ── Layer 2: Plane SVG ───────────────────────────────────────────────
          Sits exactly at mouse tip. Rotates smoothly via CSS transition (0.06s)
          to face the direction of movement.
          Scales up 10% on hover over interactive elements.               */}
      <div
        className="pointer-events-none fixed z-[99999]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.1 : 1})`,
          transition: "transform 0.2s ease",
        }}
      >
        <PlaneSVG angle={angle} />
      </div>
    </>
  )
}
