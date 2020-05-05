/* eslint-env node */
"use strict";

import { addCorsHeaders } from "./_util/cors";

export default function (request, response) {
  addCorsHeaders(response);

  response.status(200).end();
}
