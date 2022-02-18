import bcrypt from "bcrypt";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
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
const User = mongoose.model("User", userSchema);

export default User;
