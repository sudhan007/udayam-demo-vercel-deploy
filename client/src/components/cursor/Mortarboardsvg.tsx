// ─── MortarboardSVG ───────────────────────────────────────────────────────────
// Graduation cap icon for the Foreign Education cursor.
// No props — size and color are fixed for cursor use.
// Rendered centered on the mouse via translate(-50%, -50%) in EducationCursor.
//
// Parts drawn:
//   • Board top     — flat diamond/polygon (the square top of the cap)
//   • Board shine   — semi-transparent top triangle for depth
//   • Gown drape    — curved path below the board (the cap's sides hanging down)
//   • Tassel string — vertical line on the right side of the board
//   • Tassel ball   — circle at the end of the string
//   • Tassel fringe — three short lines hanging from the ball

export const MortarboardSVG = () => (
  <svg
    width="38"
    height="34"
    viewBox="0 0 38 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: "drop-shadow(0 2px 6px rgba(133,79,11,0.35))" }}
  >
    {/* Board top — diamond shape */}
    <polygon points="19,2 37,12 19,22 1,12" fill="#854F0B" />

    {/* Board shine — lighter top half for 3D depth */}
    <polygon points="19,2 37,12 19,11 1,12" fill="rgba(255,255,255,0.12)" />

    {/* Gown drape — curved sides hanging below the board */}
    <path
      d="M8 15 L8 25 C8 25 13 30 19 30 C25 30 30 25 30 25 L30 15"
      stroke="#854F0B"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Tassel string — vertical line on right */}
    <line
      x1="37"
      y1="12"
      x2="37"
      y2="22"
      stroke="#854F0B"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Tassel ball */}
    <circle cx="37" cy="23" r="2.2" fill="#854F0B" />

    {/* Tassel fringe — left strand */}
    <line
      x1="35"
      y1="25"
      x2="33"
      y2="29"
      stroke="#854F0B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Tassel fringe — center strand */}
    <line
      x1="37"
      y1="25"
      x2="37"
      y2="30"
      stroke="#854F0B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Tassel fringe — right strand */}
    <line
      x1="39"
      y1="25"
      x2="41"
      y2="29"
      stroke="#854F0B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)
