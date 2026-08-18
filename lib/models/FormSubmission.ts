import mongoose, { Schema, Document } from "mongoose";

export interface IFormSubmission extends Document {
  company: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const FormSubmissionSchema: Schema = new Schema({
  company: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.FormSubmission || mongoose.model<IFormSubmission>("FormSubmission", FormSubmissionSchema);
