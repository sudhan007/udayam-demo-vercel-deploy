import { Schema, model } from "mongoose"

interface Iadmin {
    name: string;
    email: string;
    password: string;
    role: string;
    active: boolean;
}

const adminSchema = new Schema<Iadmin>({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "ADMIN"
    },
    active: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

adminSchema.index({ email: 1 }, { unique: true })
adminSchema.index({ active: 1, createdAt: -1 });
export const AdminModel = model<Iadmin>("admin", adminSchema)