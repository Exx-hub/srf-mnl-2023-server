import mongoose from "mongoose";

// const {Schema, model} = mongoose;

export interface IUserCourse {
  courseId: string;
  enrolledOn: Date;
  status: string;
}

export interface IUser {
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  password: string;
  courses: IUserCourse[]; // research on this
}

const userSchema = new mongoose.Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      enrolledOn: { type: Date, default: new Date() },
      status: { type: String, default: "active" },
    },
  ],
});

export default mongoose.model<IUser>("User", userSchema);
