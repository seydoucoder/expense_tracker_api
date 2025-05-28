const nodemailer = require("nodemailer");

const emailManager = async (to, text, html, subject) => {
  //  var transport = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "4398bbd0513225",
  //     pass: "ae27b7795b5210"
  //   }
  // });

  // await transport.sendMail({
  //     to: to,
  //     from: "info@gbudget.com",
  //     text: text,
  //     html: html,
  //     subject: subject,
  // });

  // avec gmail
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sdkandji@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  transport.sendMail({
    to: to,
    from: "info@gbudget.com",
    subject: subject,
    text: text,
    html: html,
  });

  
};

module.exports = emailManager;
