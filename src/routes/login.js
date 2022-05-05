//ok

const router = require("express").Router();
const User = require("../model/user");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await User.findByCredentials({ email, password });
    res.status(202).json(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/reset_pass", (req, res) => {
  console.log(req.body);
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).json({ message: "logged out" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
module.exports = router;
