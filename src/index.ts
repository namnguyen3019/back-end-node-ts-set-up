import express from "express";
import connectDB from "./dbconfig";
const app = express();
const port: number = 5001;

connectDB();
app.get("/", (req, res) => {
  res.send("Hello from the other side");
});
app.listen(port, () => {
  console.log(`App is running on port ${port} `);
});
