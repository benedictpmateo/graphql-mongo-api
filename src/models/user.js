import bcrypt from "bcrypt";
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String }
  },
  {
    timestamps: true
  }
);

schema.pre("save", function(next) {
  let user = this;

  if (user.isModified("password")) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
  } else {
    next();
  }
});

schema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

export default mongoose.model("user", schema);
