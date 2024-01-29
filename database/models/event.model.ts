import { Schema, models, model, Document } from "mongoose";

export interface IEvent extends Document {
  userId: Schema.Types.ObjectId; // Refers to User
  title: string;
  description?: string;
  startTime: Schema.Types.Date;
  endTime?: Schema.Types.Date;
}

const eventSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Schema.Types.Date, required: true },
  endTime: { type: Schema.Types.Date },
});

const Event = model("Event", eventSchema) || models.Event;

export default Event;
