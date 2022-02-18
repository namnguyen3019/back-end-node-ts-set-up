import bcrypt from "bcrypt";
import { Document, model, Schema, Types } from "mongoose";
// 1. Create interface
export interface UserDocument extends Document {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  checkPassword: (password: string) => Promise<boolean>;
}

// 2. Define Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Add some method
userSchema.methods.checkPassword = async function (
  enteredPassword: string | Buffer
) {
  var user = this;
  return await bcrypt.compare(enteredPassword, user.password);
};
userSchema.pre("save", function (next) {
  var user = this;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

// 4. Create Model
const User = model<UserDocument>("User", userSchema);

export default User;
