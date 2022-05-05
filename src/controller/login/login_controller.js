const mail = require("../../mail/mailer");

const login_controller = async (user) => {
  const mail_message = `<p>Dear ${user.name},</p>
    <p>You have successfully logged in to SAE India BIT Sindri at ${Date.now()}</p>`;
  try {
    await mail(user.email, mail_message);
  } catch (error) {}
  return;
};

const signup_controller = async (user) => {
  const mail_message = `<p>Dear ${user.name},</p>
    <p>You have successfully signed up to SAE India BIT Sindri at ${Date.now()}</p>`;

  try {
    await mail(user.email, mail_message);
  } catch (error) {}
  return;
};

module.exports = { login_controller, signup_controller };
