/* eslint-env node */
"use strict";

import nodemailer from "nodemailer";

export default async function (request, response) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "contact@simplabs.com",
      serviceClient: process.env.GOOGLE_CLIENT_ID,
      privateKey: key.GOOGLE_PRIVATE_KEY,
    },
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: "contact@simplabs.com",
      to: "info@simplabs.com",
      subject: `${request.name} via simplabs.com`,
      text: request.message,
      replyTo: request.email,
    });

    response.status(200).end();
  } catch (error) {
    console.error(error);

    response.status(500).end();
  }
}
