import Post from "@src/models/postModel";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// @ desc get a post from user
// @route post api/posts/:postId
// @access prive
export const getPost = asyncHandler(async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const current_post = await Post.findById(postId);
  if (!current_post) {
    res.status(404);
    throw new Error("Post not found");
  }
  res.send(current_post);
});

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.send(posts);
});

// @ desc create a new post
// @route post api/posts/new_post
// @access private
export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const user = req.currentUser;
  const { title, body } = req.body;

  const new_post = new Post({ title, body, author: user?._id });
  await new_post.save();
  res.send(new_post);
});

// @ desc update a post
// @route post api/posts/update/:postId
// @access private
export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const { title, body } = req.body;
  const current_post = await Post.findByIdAndUpdate(
    postId,
    {
      title,
      body,
    },
    { new: true }
  );
  if (!current_post) {
    res.send(404);
    throw new Error("Post not found, could not update");
  }

  res.send(`updated ${current_post?.title}`);
});

// @ desc delete a post
// @route delete api/posts/:postId
// @access private
export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const delete_post = await Post.findByIdAndDelete(postId);
  if (!delete_post) {
    res.status(404);
    throw new Error("Post not found");
  }
  res.send(delete_post);
});
