import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IUser } from "./User";

const horseStatus = {
  AVAILABLE: "disponible",
  NOT_AVAILABLE: "no disponible",
  ON_SALE: "en venta",
} as const;

export type HorseStatus = (typeof horseStatus)[keyof typeof horseStatus];

export interface IHorse extends Document {
  horseName: string;
  available: string;
  description: string;
  image: string;
  manager: PopulatedDoc<IUser & Document>;
}

const HorseSchema: Schema = new Schema(
  {
    horseName: {
      type: String,
      required: true,
      trim: true,
    },
    available: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    manager: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Horse = mongoose.model<IHorse>("Horse", HorseSchema);
export default Horse;
