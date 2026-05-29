// ─── Shared Cursor Types ──────────────────────────────────────────────────────
// Used by all three cursor hooks (tours, medical, education)

export interface MousePosition {
    x: number
    y: number
}

export interface TrailPoint {
    id: number
    x: number
    y: number
    angle?: number // used by tours (cloud puffs) and education (pencil strokes)
}