import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDb from "./db/dbConnect.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();
const app = express();
app.use(express.json());

const PORT = 3000;

const dbUrl = process.env.MONGO_URL;

connectDb(dbUrl);

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.use("/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
