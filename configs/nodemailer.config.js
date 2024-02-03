const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "donotreplay@rootslib.me",
    pass: "alehsa.144.comM",
  },
});


module.exports = transporter;

