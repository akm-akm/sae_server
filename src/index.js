require("dotenv").config();
const express = require("express");
const app = new express();
const cors = require("cors");
const prefix = "/api/v1";
const PORT = process.env.PORT || 500;
require("./model/mongoose");
const register_router = require("./routes/register");
const login_router = require("./routes/login");
const message_router = require("./routes/message");
app
  .use(cors())
  .use(express.json())
  .use(prefix, register_router)
  .use(prefix, login_router)
  .use(prefix, message_router)
  .get("*", (_, res) =>
    res.status(200).json({ message: "Welcome to SAE Server" })
  )
  .listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
  );
