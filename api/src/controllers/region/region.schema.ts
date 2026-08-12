import { t } from "elysia"

export const createRegionDto = {
    body: t.Object({
        name: t.String({ minLength: 1, error: "Name must be at least 1 character long" }),
        isActive: t.Optional(t.Boolean()),
    }),
    detail: {
        summary: "Create a new region",
        description: "Admin: Add a new region.",
    },
}

export const updateRegionDto = {
    body: t.Object({
        name: t.Optional(t.String({ minLength: 1 })),
        isActive: t.Optional(t.Boolean()),
    }),
    detail: {
        summary: "Update a region",
        description: "Admin: Edit region details.",
    },
}

export const getRegionsDto = {
    query: t.Object({
        page: t.Optional(t.String()),
        limit: t.Optional(t.String()),
        isActive: t.Optional(t.String()), // "true" | "false"
        search: t.Optional(t.String()),
    }),
    detail: {
        summary: "Get regions with pagination, active status, and search filters",
    },
}

export const regionParamDto = {
    params: t.Object({
        id: t.String({ minLength: 24, maxLength: 24, error: "Invalid region ID format" }),
    }),
}
