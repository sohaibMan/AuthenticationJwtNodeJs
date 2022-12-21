import { Router } from "express";
import User from "../models/user.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/registre", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    //?check if the user is valid
    const error = await user.validate();
    if (error) throw error;
    // console.log("🚀 ~ file: auth.js:17 ~ router.post ~ error", error);

    //?checking if the users's email il aready used
    const isEmailUsed = await User.isEmailUsed(user.email);
    if (isEmailUsed)
      throw new Error(JSON.stringify({ message: "Email is already used" }));
    //?hasing the password
    const salt = await bycrypt.genSalt();
    user.password = await bycrypt.hash(user.password, salt);
    //?inserting the newuser to the databse
    user.save();

    //?sending the user id back to the client
    const token = jwt.sign(
      {
        id: user._id,
        exp: Date.now() + +process.env.TOKEN_EXIPE_TIME,
        iat: Date.now(),
      },
      process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).json({ status: "ok" });
    // res.status(203).send({ id: newUser._id });
  } catch (e) {
    // console.error(e);
    res.status(400).send(e.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    //?checking if the email and password are provided
    if (req.body.email === undefined || req.body.password === undefined)
      throw new Error(
        JSON.stringify({ message: "email or password is missing" })
      );
    //?checking if the user exist
    const user = await User.findOne({ email: req.body.email });
    // console.log("🚀 ~ file: auth.js:40 ~ router.post ~ user", user.email);
    if (user === null)
      throw new Error(JSON.stringify({ message: "user not found" }));

    //?checking if the email is exist
    if (user.email !== req.body.email)
      throw new Error(
        JSON.stringify({ message: "email or password are incorrect" })
      );

    //?checking if the password is correct
    const isPasswordCorrect = await bycrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      throw new Error(
        JSON.stringify({ message: "email or password  are incorrect" })
      );

    //todo  adding cookies with session id
    const token = jwt.sign(
      {
        id: user._id,
        exp: Date.now() + +process.env.TOKEN_EXIPE_TIME,
        iat: Date.now(),
      },
      process.env.TOKEN_SECRET
    );
    res.header("auth-token", token).json({ status: "ok" });
    // iat:expire at
    // console.log("🚀 ~ file: auth.js:68 ~ router.post ~ token", token);
    //?sending the user id back to the client
    // res.status(200).send({ id: user._id });
  } catch (e) {
    // console.error(e);
    res.status(400).send(e.message);
  }
});
router.post("/changepassword", async (req, res) => {
  try {
    const { email } = req.body;
    if (email === undefined) throw new Error("email is missing");
    const { oldPassword } = req.body;
    if (oldPassword === undefined) throw new Error("old password is missing");
    //?check if the old password is correct
    const { newPassword } = req.body;
    if (newPassword === undefined) throw new Error("new password is missing");
    // console.log(
    //   "🚀 ~ file: auth.js:113 ~ router.post ~ newPassword",
    //   newPassword
    // );
    const user = await User.findOne({ email: email });
    // console.log("🚀 ~ file: auth.js:103 ~ router.post ~ user", user);
    if (!user) throw new Error(JSON.stringify({ message: "user not found" }));
    const isPasswordCorrect = await bycrypt.compare(oldPassword, user.password);
    // console.log(
    //   "🚀 ~ file: auth.js:103 ~ router.post ~ isPasswordCorrect",
    //   isPasswordCorrect
    // );
    if (!isPasswordCorrect)
      throw new Error(JSON.stringify({ message: "old password is incorrect" }));
    //?hasing the password

    const salt = await bycrypt.genSalt();
    const hashedPassword = await bycrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
    res.status(200).send({ status: "ok" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
