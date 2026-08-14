import { Schema, model } from "mongoose";

export interface IRegion {
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const regionSchema = new Schema<IRegion>(
  {
    name: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexes for filter queries
regionSchema.index({ isDeleted: 1 });
regionSchema.index({ isActive: 1 });
regionSchema.index({ order: 1, createdAt: -1 });

export const RegionModel = model<IRegion>("region", regionSchema);
