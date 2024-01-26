import { Schema, models, model, Document } from "mongoose";
import * as uuid from "uuid";
export interface INylasInfo extends Document {
  accessToken: string;
  refreshToken: string;
  userId: Schema.Types.ObjectId; // Refers to User
}

const nylasInfoSchema = new Schema<INylasInfo>({
  _id: { type: String, default: () => uuid.v4() },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  userId: { type: String, required: true, unique: true, ref: "User" },
});

export const NylasInfo =
  model<INylasInfo>("NylasInfo", nylasInfoSchema) || models.NylasInfo;
export default NylasInfo;
