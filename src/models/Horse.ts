import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IUser } from "./User";

export interface IHorse extends Document {
  horseName: string;
  age: number;
  gender: string;
  breed: string;
  color: string;
  height: number;
  description: string;
  available: string;
  price: number;
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
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    breed: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    height: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    available: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
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
