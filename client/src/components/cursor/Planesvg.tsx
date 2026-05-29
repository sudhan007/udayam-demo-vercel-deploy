export const PlaneSVG = ({ angle }: { angle: number }) => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: `rotate(${angle}deg)`,
      filter: "drop-shadow(0 2px 6px rgba(27,43,107,0.35))",
      transition: "transform 0.06s linear",
    }}
  >
    {/* Outer circle */}
    <circle
      cx="26"
      cy="26"
      r="22"
      stroke="#1B2B6B"
      strokeWidth="2.5"
      fill="white"
    />

    {/* Plane group */}
    <g transform="translate(7 7)">
      {/* Fuselage */}
      <ellipse cx="19" cy="19" rx="3.5" ry="12" fill="#1B2B6B" />

      {/* Main wings */}
      <path d="M19 17 L35 24 L19 22 L3 24 Z" fill="#1B2B6B" />

      {/* Tail wings */}
      <path d="M19 29 L27 33 L19 31 L11 33 Z" fill="#1B2B6B" />

      {/* Cockpit glint */}
      <ellipse
        cx="19"
        cy="9.5"
        rx="1.8"
        ry="2.5"
        fill="rgba(255,255,255,0.45)"
      />
    </g>
  </svg>
)
