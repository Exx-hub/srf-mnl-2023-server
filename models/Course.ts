import mongoose from "mongoose";

export interface ICourse {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  createdOn: Date;
  //   enrollees: []; // research on this
}

const courseSchema = new mongoose.Schema<ICourse>({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: new Date() },
  //   enrollees: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //   ],
});

export default mongoose.model<ICourse>("Course", courseSchema);
