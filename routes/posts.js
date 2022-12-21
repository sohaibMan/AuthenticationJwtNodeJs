// this route is protected

import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
// import {getPosts,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js';
function auth(req, res, next) {
  try {
    console.log("auth middleware");
    const token = req.headers["auth-token"];
    if (!token) throw new Error(JSON.stringify({ message: "access denied" }));
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("🚀 ~ file: posts.js:13 ~ auth ~ user", Date.now() > user.exp);
    if (Date.now() > user.exp)
      throw new Error(
        JSON.stringify({ message: "access denied-token exipred" })
      );
    req.user = user;
    next();
  } catch (e) {
    res.status(400).json(e.message);
  }
}

router.use(auth);

router.get("/", (req, res) => {
  res.send(
    `this route is protected, and you've get acces to  as user with id =${req.user.id}`
  );
});

router.post("/", (req, res) => {
  res.send(
    `this route is protected, and you've get acces to  as user with id =${req.user.id}`
  );
});

router.put("/", (req, res) => {
  res.send(
    `this route is protected, and you've get acces to  as user with id =${req.user.id}`
  );
});

router.patch("/", (req, res) => {
  res.send(
    `this route is protected, and you've get acces to  as user with id =${req.user.id}`
  );
});

export default router;
