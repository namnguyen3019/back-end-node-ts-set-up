import User from "@src/models/userModel";
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
export const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, "secret_key_here") as JwtPayload;
        console.log(decoded);
        const user = await User.findById(decoded.id).select("-password");

        req.currentUser = user;
        next();
      } catch (e) {
        console.error(e);
        res.status(401);
        throw new Error(" Wrong email or password");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized or No token found");
    }
  }
);
