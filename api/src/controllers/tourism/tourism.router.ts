import { Elysia } from "elysia"
import {
    createTouristPlace,
    updateTouristPlace,
    deleteTouristPlace,
    getAllTouristPlaces,
    getTouristPlaceById,
} from "./toursim.service"
import {
    createTourismDto,
    updateTourismDto,
    getTourismDto,
    tourismParamDto,
} from "./tourism.schema"
import { adminOnly } from "@lib/authGuard"

export const tourismRouter = new Elysia({
    prefix: "/tourism",
    detail: { tags: ["Tourism"] },
})
    /**
     * POST /tourism
     * Admin: create a new package with cover image upload
     */
    .post("/", createTouristPlace, {
        ...createTourismDto,
        beforeHandle: adminOnly,
    })

    /**
     * GET /tourism
     * Public: list all packages with sidebar filters
     * ?packageType=DOMESTIC
     * &destinationRegions=INDIA,EUROPE
     * &tripTypes=HONEYMOON,FAMILY
     * &durationCategories=4-7,8-14
     * &minPrice=5000&maxPrice=200000
     * &sortBy=price_asc
     * &page=1&limit=12
     */
    .get("/", getAllTouristPlaces, getTourismDto)

    /**
     * GET /tourism/:id
     * Public: single package detail
     */
    .get("/:id", getTouristPlaceById, tourismParamDto)

    /**
     * PATCH /tourism/:id
     * Admin: partial update, optionally replace cover image
     */
    .patch("/:id", updateTouristPlace, {
        ...updateTourismDto,
        params: tourismParamDto.params,
        beforeHandle: adminOnly,
    })

    /**
     * DELETE /tourism/:id
     * Admin: delete package + S3 images
     */
    .delete("/:id", deleteTouristPlace, {
        ...tourismParamDto,
        beforeHandle: adminOnly,
    })