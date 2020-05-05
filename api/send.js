/* eslint-env node */
"use strict";

import nodemailer from "nodemailer";

const KEY = require("./key.json");

export default async function (request, response) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "contact@simplabs.com",
      serviceClient: key.client_id,
      privateKey: key.private_key,
    },
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: key.client_email,
      to: "info@simplabs.com",
      subject: `${request.name} via simplabs.com`,
      text: request.message,
      replyTo: request.email,
    });

    response.status(200);
  } catch (error) {
    console.error(error);

    response.status(500);
  }
}
