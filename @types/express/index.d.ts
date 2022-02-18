import User from "../../src/models/userModel";
declare global {
  export namespace Express {
    interface Request {
      currentUser?: typeof User;
    }
  }
}
