import { t } from "elysia"

export const createTripTypeDto = {
    body: t.Object({
        name: t.String({ minLength: 1, error: "Name must be at least 1 character long" }),
        isActive: t.Optional(t.Boolean()),
        order: t.Optional(t.Any()),
    }),
    detail: {
        summary: "Create a new trip type",
        description: "Admin: Add a new trip type.",
    },
}

export const updateTripTypeDto = {
    body: t.Object({
        name: t.Optional(t.String({ minLength: 1 })),
        isActive: t.Optional(t.Boolean()),
        order: t.Optional(t.Any()),
    }),
    detail: {
        summary: "Update a trip type",
        description: "Admin: Edit trip type details.",
    },
}

export const getTripTypesDto = {
    query: t.Object({
        page: t.Optional(t.String()),
        limit: t.Optional(t.String()),
        isActive: t.Optional(t.String()), // "true" | "false"
        search: t.Optional(t.String()),
    }),
    detail: {
        summary: "Get trip types with pagination, active status, and search filters",
    },
}

export const tripTypeParamDto = {
    params: t.Object({
        id: t.String({ minLength: 24, maxLength: 24, error: "Invalid trip type ID format" }),
    }),
}
