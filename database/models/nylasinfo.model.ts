import { Schema, models, model, Document } from "mongoose";
export interface INylasInfo extends Document {
  grantId: string;
  userId: Schema.Types.ObjectId; // Refers to User
}

const nylasInfoSchema = new Schema({
  grantId: { type: String, required: true, unique: true },
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
