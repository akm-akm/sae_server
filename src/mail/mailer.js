const nodemailer = require("nodemailer");

module.exports = async (recepient_email, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_APP_PASS,
    },
  });
  const mailOptions = {
    from: process.env.GMAIL,
    to: recepient_email,
    subject: "SAE India BIT Sindri",
    html: `<p>${message}</p>`,
  };
  const mail = await transporter.sendMail(mailOptions);
  return mail;
};
