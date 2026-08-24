import { Context } from "elysia";
import { RoleType } from "@types";
import { DecodePaseto, DecodeUserPaseto } from "@lib/paseto";
import { UserModel } from "@models/user.model";

export const adminOnly = (ctx: Context) => roleGuard(ctx, [RoleType.ADMIN])
export const userOnly = (ctx: Context) => roleGuard(ctx, [RoleType.USER])
export const userAndAdminOnly = (ctx: Context) => roleGuard(ctx, [RoleType.USER, RoleType.ADMIN])

export const roleGuard = async (
    ctx: Context,
    allowedRoles: RoleType[]
) => {
    const { cookie, set, store }: any = ctx;

    // Determine which cookie & decoder to use based on the allowed roles
    const isAdminAllowed = allowedRoles.includes(RoleType.ADMIN);
    const isUserAllowed = allowedRoles.includes(RoleType.USER);

    let payload: any = null;
    let isUserToken = false;

    // Try user cookie first if USER role is allowed
    if (isUserAllowed) {
        const userToken = cookie.udayam_access_token_user?.value;
        if (userToken) {
            payload = await DecodeUserPaseto(userToken);
            if (payload) isUserToken = true;
        }
    }

    // Try admin cookie if ADMIN role is allowed and no user payload found yet
    if (!payload && isAdminAllowed) {
        const adminToken = cookie.udayam_access_token_admin?.value;
        if (adminToken) {
            payload = await DecodePaseto(adminToken);
        }
    }

    if (!payload) {
        set.status = 401;
        return { error: "Authentication token missing" };
    }

    try {
        if (!allowedRoles.includes(payload.role)) {
            set.status = 403;
            return { error: "Forbidden: Insufficient role" };
        }

        // ── Live status check for user tokens ──────────────────────────────
        // JWT tokens are long-lived, so we must verify the user is still ACTIVE
        // in the DB on every protected request. This ensures that blocking a user
        // in the admin panel takes effect on their very next API call.
        if (isUserToken && payload.id) {
            const user = await UserModel.findById(payload.id).select("status").lean();
            if (!user || user.status !== "ACTIVE") {
                set.status = 401;
                return { error: "Your account has been blocked. Please contact support." };
            }
        }

        store.id = payload.id;
        store.role = payload.role;
    } catch (error) {
        console.error(error);
        set.status = 401;
        return { error: "Invalid or expired token" };
    }
};