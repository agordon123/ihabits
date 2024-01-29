import { Schema, models, model, Document } from "mongoose";
export interface INylasInfo extends Document {
  accessToken: string;
  refreshToken: string;
  userId: Schema.Types.ObjectId; // Refers to User
}

const nylasInfoSchema = new Schema<INylasInfo>({
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
});

export const NylasInfo =
  model("NylasInfo", nylasInfoSchema) || models.NylasInfo;
export default NylasInfo;
