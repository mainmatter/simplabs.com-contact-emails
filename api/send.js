/* eslint-env node */
"use strict";

import nodemailer from "nodemailer";
import atob from "atob";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_PRIVATE_KEY: GOOGLE_PRIVATE_KEY_BASE64,
} = process.env;
const GOOGLE_PRIVATE_KEY = atob(GOOGLE_PRIVATE_KEY_BASE64);

export default async function (request, response) {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "contact@simplabs.com",
      serviceClient: GOOGLE_CLIENT_ID,
      privateKey: GOOGLE_PRIVATE_KEY,
    },
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: "contact@simplabs.com",
      to: "info@simplabs.com",
      subject: `${request.body.name || "Message"} via simplabs.com`,
      text: request.body.message,
      replyTo: request.body.email,
    });

    response.status(200).end();
  } catch (error) {
    console.error(error);

    response.status(500).end();
  }
}
