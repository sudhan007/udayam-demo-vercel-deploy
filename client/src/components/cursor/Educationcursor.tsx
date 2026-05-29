// ─── EducationCursor ──────────────────────────────────────────────────────────
// Drop this at the top of your Foreign Education page JSX.
// Renders three layers:
//
//   Layer 1 (z-99990) — Pencil stroke trail  — angled marks like chalk on a board
//   Layer 2 (z-99991) — Diamond ring         — rotated square framing the cap
//   Layer 3 (z-99999) — Mortarboard SVG      — the main cursor icon

import { MortarboardSVG } from "./Mortarboardsvg"
import { useEducationCursor } from "./Useeducationcursor"

export const EducationCursor = () => {
  const { mousePos, isHovered, trail } = useEducationCursor()

  return (
    <>
      {/* ── Layer 1: Pencil stroke trail ─────────────────────────────────────
          Each trail point is a thin rectangle rotated to the movement angle.
          The +90 in the hook makes strokes perpendicular to travel direction
          (like a pen nib dragging across paper).
          Height and opacity grow from oldest → newest.
          Removed every 100ms → fast erase like chalk marks.            */}
      {trail.map((pt, i) => {
        const progress = (i + 1) / trail.length
        const height = 4 + progress * 10 // 4px → 14px stroke length
        const opacity = progress * 0.5 // 0 → 0.5

        return (
          <div
            key={pt.id}
            className="pointer-events-none fixed z-[99990]"
            style={{
              left: pt.x,
              top: pt.y,
              width: 3,
              height,
              borderRadius: 2,
              background: "rgba(133,79,11,0.6)",
              transform: `translate(-50%, -50%) rotate(${pt.angle ?? 0}deg)`,
              opacity,
            }}
          />
        )
      })}

      {/* ── Layer 2: Diamond ring ────────────────────────────────────────────
          A square div rotated 45° → becomes a diamond shape.
          Expands and darkens when hovering interactive elements.        */}
      <div
        className="pointer-events-none fixed z-[99991]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: isHovered ? 52 : 38,
          height: isHovered ? 52 : 38,
          border: `1.5px solid rgba(133,79,11,${isHovered ? 0.7 : 0.4})`,
          background: isHovered ? "rgba(133,79,11,0.06)" : "transparent",
          borderRadius: 4,
          transform: "translate(-50%, -50%) rotate(45deg)",
          transition:
            "width 0.2s, height 0.2s, border-color 0.2s, background 0.2s",
        }}
      />

      {/* ── Layer 3: Mortarboard icon ────────────────────────────────────────
          Scales up 10% on hover.                                        */}
      <div
        className="pointer-events-none fixed z-[99999]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.1 : 1})`,
          transition: "transform 0.2s ease",
        }}
      >
        <MortarboardSVG />
      </div>
    </>
  )
}
