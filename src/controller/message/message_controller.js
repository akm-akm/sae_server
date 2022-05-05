const Message = require("../../model/message");
const SentMessage = require("../../model/sent_mail");
const mail = require("../../mail/mailer");


const add_message = async (name, email, subject, phone, message) => {
  const new_message = new Message({
    name,
    email,
    subject,
    phone,
    message,
  });

  await new_message.save();
  return new_message;
};

const get_message = async () => {
  const messages = await Message.find({});
  return messages;
};

const update_message = async (id) => {
  const message = await Message.findByIdAndUpdate(id, { read: true });
  return message;
};

const send_mail = async ({ to_email, subject, message }) => {
  const mail_message = `<h3>${subject}</h3>
  <p>${message}</p>`;

  const sent_mail = new SentMessage({
    to_email,
    subject,
    message,
  });

  await mail(to_email, mail_message);
  await sent_mail.save();
  return;
};

module.exports = { send_mail, add_message, update_message, get_message };
