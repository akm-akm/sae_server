const path = require("path");
const User = require(path.join(__dirname, "../model/user"));
const jwt = require("jsonwebtoken");

auth = async (req, res, next) => {
  try {
    if (req.header("Authorization")) {
      const token = await req.header("Authorization").replace("Bearer ", "");
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      if (!user) {
        throw new Error("Please Authenticate");
      }
      req.user = user;
      req.token = token;
      next();
    } else {
      throw new Error("no token");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Please authenticate." });
  }
};

module.exports = auth;
