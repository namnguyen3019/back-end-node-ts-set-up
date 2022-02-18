import User from "../../src/models/userModel";
declare global {
  namespace Express {
    interface Request {
      currentUser?: typeof User;
    }
  }
}
