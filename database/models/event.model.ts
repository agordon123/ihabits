import { Schema, models, model, Document } from "mongoose";
import * as uuid from "uuid";

export interface IEvent extends Document {
  userId: Schema.Types.ObjectId; // Refers to User
  title: string;
  description?: string;
  startTime: Schema.Types.Date;
  endTime?: Schema.Types.Date;
}

const eventSchema = new Schema<IEvent>({
  _id: { type: String, default: () => uuid.v4() },
  userId: { type: String, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
});

const Event = model<IEvent>("Event", eventSchema) || models.Event;

export default Event;
