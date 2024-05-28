import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IUser } from "./User";

export interface IActivity extends Document {
  activityName: string;
  available: string;
  description: string;
  startDate: Date;
  image: string;
  manager: PopulatedDoc<IUser & Document>;
}

const ActivitySchema: Schema = new Schema(
  {
    activityName: {
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
    startDate: {
      type: Date,
      required: true
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

const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);
export default Activity;
