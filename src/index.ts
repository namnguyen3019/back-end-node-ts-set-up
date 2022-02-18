import express from "express";
import connectDB from "./config";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
const app = express();
app.use(express.json());
const port: number = 5001;

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/posts/", postRoutes);
app.listen(port, () => {
  console.log(`App is running on port ${port} `);
});
