// ─── StethoscopeSVG ───────────────────────────────────────────────────────────
// Stethoscope icon for the Medical Tourism cursor.
// No props — size and color are fixed for cursor use.
// Rendered centered on the mouse via translate(-50%, -50%) in MedicalCursor.
//
// Parts drawn (top to bottom):
//   • Two earpiece tips     — filled circles at top-left and top-right
//   • Two earpiece stems    — short vertical lines below the tips
//   • Headband arc          — curve connecting both stems through center
//   • Tube                  — vertical line from center of arc downward
//   • Chest piece           — circle at bottom with a medical + cross inside

export const StethoscopeSVG = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: "drop-shadow(0 2px 6px rgba(15,110,86,0.35))" }}
  >
    {/* Left earpiece stem */}
    <line
      x1="10"
      y1="4"
      x2="10"
      y2="9"
      stroke="#0F6E56"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Right earpiece stem */}
    <line
      x1="26"
      y1="4"
      x2="26"
      y2="9"
      stroke="#0F6E56"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Left earpiece tip */}
    <circle cx="10" cy="4" r="2" fill="#0F6E56" />

    {/* Right earpiece tip */}
    <circle cx="26" cy="4" r="2" fill="#0F6E56" />

    {/* Headband arc — cubic bezier through center */}
    <path
      d="M10 9 C10 14 14 16 18 16 C22 16 26 14 26 9"
      stroke="#0F6E56"
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
    />

    {/* Tube — from arc center down to chest piece */}
    <line
      x1="18"
      y1="16"
      x2="18"
      y2="26"
      stroke="#0F6E56"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Chest piece — hollow circle with teal tint fill */}
    <circle
      cx="18"
      cy="30"
      r="4.5"
      stroke="#0F6E56"
      strokeWidth="2"
      fill="rgba(15,110,86,0.1)"
    />

    {/* Cross — vertical bar */}
    <line
      x1="18"
      y1="27.5"
      x2="18"
      y2="32.5"
      stroke="#0F6E56"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Cross — horizontal bar */}
    <line
      x1="15.5"
      y1="30"
      x2="20.5"
      y2="30"
      stroke="#0F6E56"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)
