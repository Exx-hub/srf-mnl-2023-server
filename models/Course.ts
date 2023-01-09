import mongoose from "mongoose";

export interface ICourse {
  title: string;
  description: string;
  price: number;
  isActive: boolean;
  createdOn: Date;
}

const courseSchema = new mongoose.Schema<ICourse>({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: new Date() },
});

export default mongoose.model<ICourse>("Course", courseSchema);
