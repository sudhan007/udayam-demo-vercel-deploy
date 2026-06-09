import Elysia from "elysia";
import { adminAuthController } from "./auth/auth.router";
import { tourismRouter } from "./tourism/tourism.router";

const BaseRouter = new Elysia({
    prefix: "/api/V1",
    tags: ["Base Router"]
})

    .use(adminAuthController)
    .use(tourismRouter)

export { BaseRouter }