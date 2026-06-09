import { Context } from "elysia";
import { RoleType } from "@types";
import { DecodePaseto } from "@lib/paseto";

export const adminOnly = (ctx: Context) => roleGuard(ctx, [RoleType.ADMIN])



export const roleGuard = async (ctx: Context, allowedRoles: RoleType[]) => {

    const { request, set, store }: any = ctx;

    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
        set.status = 401;
        return { error: " Authorization header missing" };
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const payload: any = await DecodePaseto(token);
        if (!payload) {
            set.status = 401;
            return { error: "Invalid or expired token" };
        }
        if (!allowedRoles.includes(payload.role)) {
            set.status = 403;
            return { error: "Forbidden: Insufficient role" };
        }
        store.id = payload.id
        store.role = payload.role
    } catch (error) {
        console.error(error);
        set.status = 401;
        return { error: "Invalid or expired token" };
    }
}