import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "@src/controllers/postControllers";
import { protect } from "@src/middleware/authUser";
import express from "express";
const routes = express.Router();
routes.get("/", getPosts);
routes.get("/:postId", getPost);
routes.delete("/:postId", protect, deletePost);
routes.post("/new_post", protect, createPost);
routes.put("/update/:postId", protect, updatePost);

export default routes;
