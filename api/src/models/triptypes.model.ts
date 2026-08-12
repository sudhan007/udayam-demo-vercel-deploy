import { Schema, model } from "mongoose";

export interface ITripType {
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const tripTypeSchema = new Schema<ITripType>(
  {
    name: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes for filter queries
tripTypeSchema.index({ isDeleted: 1 });
tripTypeSchema.index({ isActive: 1 });

export const TripTypeModel = model<ITripType>("triptype", tripTypeSchema);
