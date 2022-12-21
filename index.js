import express, { json } from "express";
const app = express();
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import postsRoute from "./routes/posts.js";
dotenv.config();
import mongoose from "mongoose";
console.log("connecting to database ....");
dotenv.config();
// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/auth?retryWrites=true&w=majority`;
const uri = `mongodb://localhost:27017/auth`;
// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/auth?retryWrites=true&w=majority`;
mongoose.set("strictQuery", true);
await mongoose.connect(uri);
console.log("connecting to database  is done");

app.use(json());

app.listen(process.env.PORT || 3000);

app.use("/api/v1/user", authRoute);
app.use("/api/v1/posts", postsRoute);
