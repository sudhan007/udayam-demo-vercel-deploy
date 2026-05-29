// ─── MedicalCursor ────────────────────────────────────────────────────────────
// Drop this at the top of your Medical Tourism page JSX.
// Renders three layers:
//
//   Layer 1 (z-99990) — Dot trail         — small green dots behind the cursor
//   Layer 2 (z-99991) — Pulse rings       — two radiating heartbeat rings
//   Layer 3 (z-99999) — Stethoscope SVG   — the main cursor icon

import { StethoscopeSVG } from "./Stethoscopesvg"
import { useMedicalCursor } from "./Usemedicalcursor"

export const MedicalCursor = () => {
  const { mousePos, isHovered, trail } = useMedicalCursor()

  return (
    <>
      {/* ── Layer 1: Dot trail ───────────────────────────────────────────────
          Simple circles at past mouse positions.
          Grow from 4px → 12px and 0 → 0.4 opacity oldest → newest.
          Removed one-by-one every 120ms by the hook.                    */}
      {trail.map((pt, i) => {
        const progress = (i + 1) / trail.length
        const size = 4 + progress * 8
        const opacity = progress * 0.4

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
              background: "rgba(15,110,86,0.5)",
              transform: "translate(-50%, -50%)",
              opacity,
            }}
          />
        )
      })}

      {/* ── Layer 2: Pulse rings ─────────────────────────────────────────────
          Two concentric rings that scale outward and fade via @keyframes medPulse.
          Ring 2 is delayed 0.6s → creates a continuous double-pulse heartbeat.
          Border becomes more opaque on hover.
          Requires @keyframes medPulse in your <style> block — see cursor.css.  */}
      <div
        className="pointer-events-none fixed z-[99991]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Ring 1 */}
        <div
          style={{
            position: "absolute",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: `1.5px solid rgba(15,110,86,${isHovered ? 0.7 : 0.4})`,
            transform: "translate(-50%, -50%)",
            animation: "medPulse 1.6s ease-out infinite",
            transition: "border-color 0.2s",
          }}
        />
        {/* Ring 2 — delayed 0.6s */}
        <div
          style={{
            position: "absolute",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: `1.5px solid rgba(15,110,86,${isHovered ? 0.4 : 0.2})`,
            transform: "translate(-50%, -50%)",
            animation: "medPulse 1.6s ease-out 0.6s infinite",
            transition: "border-color 0.2s",
          }}
        />
      </div>

      {/* ── Layer 3: Stethoscope icon ────────────────────────────────────────
          Scales up 15% on hover.                                         */}
      <div
        className="pointer-events-none fixed z-[99999]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.15 : 1})`,
          transition: "transform 0.2s ease",
        }}
      >
        <StethoscopeSVG />
      </div>
    </>
  )
}
