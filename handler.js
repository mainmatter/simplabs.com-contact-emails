/* eslint-env node */
'use strict';

const nodemailer = require('nodemailer');

const client = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

module.exports.hello = (event, context, callback) => {
  let mailOptions = {
    to: 'info@simplabs.com',
    subject: `Message from ${event.name} regarding simplabs.com`,
    text: `${event.message} '\n \n Answer to: ${event.email}`,
  };

  client.sendMail(mailOptions, (error) => {
    if (error) {
      callback(error);
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Yehaaa, it worked! Check your mails!',
        input: event,
      }),
    };

    callback(null, response);
  });
};
