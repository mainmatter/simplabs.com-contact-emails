/* eslint-env node */
"use strict";

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const { GOOGLE_CLIENT_ID, GOOGLE_PRIVATE_KEY, PORT = 5000 } = process.env;

express()
  .use(cors())
  .use(bodyParser.json())
  .post("/api/send", async (request, response) => {
    console.log(request.body);
    let transporter = nodemailer.createTransport({
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
        bcc: "simplabs@pipedrivemail.com",
        subject: `${request.body.name || "Message"} via simplabs.com`,
        text: request.body.message,
        replyTo: request.body.email,
      });

      response.status(200).end();
    } catch (error) {
      console.error(error);

      response.status(500).end();
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
