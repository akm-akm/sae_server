//ok

const express = require("express");
const path = require("path");
const User = require(path.join(__dirname, "../model/user"));
const router = express.Router();
const auth = require("../util/auth");
router.post("/register", async (req, res) => {
  const { email, password, name, dob, gender } = req.body;
  try {
    const user = new User({
      email,
      password,
      name,
      gender,
      dob,
    });
    user.jwtToken();
    const new_user = await user.save();
    res.status(201).json(new_user);
  } catch (err) {
    res.status(501).json(err.message);
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    res.status(200).json({ message: "user account and data deleted." });
  } catch (err) {
    res.status(501).json(err.message);
  }
});

module.exports = router;
