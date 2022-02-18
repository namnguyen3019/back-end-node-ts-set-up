import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  return jwt.sign({ id }, "secret_key_here", {
    expiresIn: "30d",
  });
};

export default generateToken;
