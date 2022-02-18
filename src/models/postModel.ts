import { Document, model, Schema, Types } from "mongoose";
import { UserDocument } from "../models/userModel";
export interface PostDocument extends Document {
  _id?: Types.ObjectId;
  title: string;
  body: string;
  author: UserDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Post = model<PostDocument>("Post", postSchema);
export default Post;
