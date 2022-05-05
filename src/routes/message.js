const router = require("express").Router();
const {
  send_mail,
  add_message,
  get_message,
  update_message,
} = require("../controller/message/message_controller");
const auth = require("../util/auth");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post("/message", async (req, res) => {
  const { name, email, subject, phone, message } = req.body;
  try {
    const new_message = await add_message(name, email, subject, phone, message);
    res.status(201).json(new_message);
  } catch (err) {
    res.status(501).json(err.message);
  }
});

router.get("/message", auth, async (req, res) => {
  try {
    const message = await get_message();
    res.status(201).json(message);
  } catch (err) {
    res.status(501).json(err.message);
  }
});

router.put("/message_read_toggle/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const message = await update_message(id);
    res.status(201).json(message);
  } catch (err) {
    res.status(501).json(err.message);
  }
});

router.post("/send_mail", auth, async (req, res) => {
  const { email, subject, message } = req.body;
  try {
    await send_mail({ to_email: email, subject, message });
    res.status(201).json("Mail sent successfully");
  } catch (err) {
    res.status(501).json(err.message);
  }
});

module.exports = router;
