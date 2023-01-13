import mongoose, { ObjectId, Types } from "mongoose";

// const {Schema, model} = mongoose;

export interface IUser {
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  password: string;
  courses: Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

export default mongoose.model<IUser>("User", userSchema);

// courses: [
//   {
//     courseId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//     },
//     enrolledOn: { type: Date, default: new Date() },
//     status: { type: String, default: "active" },
//   },
// ],
