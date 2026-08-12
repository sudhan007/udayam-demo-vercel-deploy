import { Elysia } from "elysia"
import {
    createRegion,
    updateRegion,
    toggleActiveRegion,
    deleteRegion,
    getAllRegions,
} from "./region.service"
import {
    createRegionDto,
    updateRegionDto,
    getRegionsDto,
    regionParamDto,
} from "./region.schema"
import { adminOnly } from "@lib/authGuard"

export const regionRouter = new Elysia({
    prefix: "/regions",
    detail: { tags: ["Regions"] },
})
    .get("/", getAllRegions, getRegionsDto)
    .post("/", createRegion, {
        ...createRegionDto,
        beforeHandle: adminOnly,
    })
    .patch("/:id", updateRegion, {
        ...regionParamDto,
        ...updateRegionDto,
        beforeHandle: adminOnly,
    })
    .patch("/:id/toggle-active", toggleActiveRegion, {
        ...regionParamDto,
        beforeHandle: adminOnly,
    })
    .delete("/:id", deleteRegion, {
        ...regionParamDto,
        beforeHandle: adminOnly,
    })
