import { Elysia } from "elysia"
import {
    createTripType,
    updateTripType,
    toggleActiveTripType,
    deleteTripType,
    getAllTripTypes,
} from "./triptypes.service"
import {
    createTripTypeDto,
    updateTripTypeDto,
    getTripTypesDto,
    tripTypeParamDto,
} from "./triptypes.schema"
import { adminOnly } from "@lib/authGuard"

export const triptypesRouter = new Elysia({
    prefix: "/trip-types",
    detail: { tags: ["Trip Types"] },
})
    .get("/", getAllTripTypes, getTripTypesDto)
    .post("/", createTripType, {
        ...createTripTypeDto,
        beforeHandle: adminOnly,
    })
    .patch("/:id", updateTripType, {
        ...tripTypeParamDto,
        ...updateTripTypeDto,
        beforeHandle: adminOnly,
    })
    .patch("/:id/toggle-active", toggleActiveTripType, {
        ...tripTypeParamDto,
        beforeHandle: adminOnly,
    })
    .delete("/:id", deleteTripType, {
        ...tripTypeParamDto,
        beforeHandle: adminOnly,
    })
