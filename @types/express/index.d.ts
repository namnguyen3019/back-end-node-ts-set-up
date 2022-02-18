import { UserDocument } from "@src/models/userModel";
declare global {
  export namespace Express {
    interface Request {
      currentUser?: UserDocument;
    }
  }
}
