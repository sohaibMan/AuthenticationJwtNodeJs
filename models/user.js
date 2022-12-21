import mongoose from "mongoose";
const userScehma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 50,
    },
    email: {
      type: String,
      index: true,
      required: true,
      minLength: 6,
      maxLength: 50,
      validate: {
        validator: (v) => v.includes("@"),
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 1024,
    },
    date: { type: Date, default: Date.now },
  },
  {
    statics: {
      async isEmailUsed(email) {
        return !!(await this.findOne({ email }));
      },
    },
  }
);
// userScehma.pre("save", function (next) {
//   const userEmail = this.email;
//   const isUserEmailAlreadyExists = true;

//   console.log(this);
//   next();
// });
const User = mongoose.model("user", userScehma);

export default User;
