import mongoose from "mongoose";

// const {Schema, model} = mongoose;

export interface IUser {
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>("User", userSchema);
