const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  about: {
    type: String,
    trim: true,
  },
  dob: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: String,
    trim: true,
    default: Date.now(),
  },
  tokens: [
    {
      token: {
        type: String,
        trim: true,
      },
    },
  ],
  profilePicture: {
    type: Buffer,
  },
});

userSchema.methods.jwtToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  this.tokens = this.tokens.concat({ token });
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  // delete user.tokens;
  delete user.__v;
  return user;
};

userSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
});

userSchema.statics.findByCredentials = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("unknown user");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("wrong password");
  }
  const token = user.jwtToken();
  console.log(token);
  user.save();
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
