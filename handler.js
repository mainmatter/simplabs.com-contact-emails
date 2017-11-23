/* eslint-env node */
'use strict';

const nodemailer = require('nodemailer');

const client = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

module.exports.hello = (event, context, callback) => {
  let mailOptions = {
    to: 'info@simplabs.com',
    subject: `${event.name} via simplabs.com`,
    text: event.message,
    replyTo: event.email
  };

  client.sendMail(mailOptions, (err) => callback(err));
};
