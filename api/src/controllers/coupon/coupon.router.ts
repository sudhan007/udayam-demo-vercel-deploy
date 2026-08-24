import { Elysia } from "elysia"
import {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getAllCoupons,
    getCouponById,
    getApplicableUsers,
    getApplicablePackages,
    getActiveCoupons,
    toggleActiveCoupon,
} from "./coupon.service"
import {
    getCouponsDto,
    couponParamDto,
} from "./coupon.schema"
import { adminOnly } from "@lib/authGuard"

export const couponRouter = new Elysia({
    prefix: "/coupon",
    detail: { tags: ["Coupons"] },
})
    .get("/active", getActiveCoupons)
    .post("/", createCoupon, { beforeHandle: adminOnly })
    .get("/", getAllCoupons, { ...getCouponsDto, beforeHandle: adminOnly })
    .get("/helper/users", getApplicableUsers, { beforeHandle: adminOnly })
    .get("/helper/packages", getApplicablePackages, { beforeHandle: adminOnly })
    .get("/:id", getCouponById, { ...couponParamDto, beforeHandle: adminOnly })
    .patch("/:id", updateCoupon, { beforeHandle: adminOnly })
    .patch("/:id/toggle-active", toggleActiveCoupon, {
        ...couponParamDto,
        beforeHandle: adminOnly,
        detail: { summary: "Toggle active/inactive status of coupon" },
    })
    .delete("/:id", deleteCoupon, { ...couponParamDto, beforeHandle: adminOnly })
