import { Elysia } from "elysia";
import { createAdmin, adminSession, loginAdmin, logoutAdmin } from "./auth.service";
import { createAdminDto, loginAdminDto, logoutDto, sessionDto } from "./auth.schema";
import { adminOnly } from "@lib/authGuard";

export const adminAuthController = new Elysia({
    prefix: '/admin-auth',
    detail: {
        tags: ["Admin Authentication"]
    }
})
    .post("/create", createAdmin, { ...createAdminDto, beforeHandle: adminOnly })
    .post("/login", loginAdmin, { ...loginAdminDto, beforeHandle: adminOnly })
    .post("/logout", logoutAdmin, { ...logoutDto, beforeHandle: adminOnly })
    .get("/session", adminSession, { ...sessionDto, beforeHandle: adminOnly })