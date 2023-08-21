import mongoose from "mongoose";

interface iAuth {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  address?: string;
  avatar?: string;
  avatarID?: string;
}

export interface iAuthData extends iAuth, mongoose.Document {}

const authSchema = new mongoose.Schema<iAuthData>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  address: { type: String },
  avatar: { type: String },
  avatarID: { type: String },
});


export default mongoose.model<iAuthData>("auths", authSchema)