import express from "express";
import {validate} from "./validation.middleware";
import {CreateShortLinkRequest} from "./short-link.schema";
import {createShortLink} from "./short-link.controller";

const APP = express();
const PORT = 3000;

APP.use(express.json());

APP.post("/short-link", validate(CreateShortLinkRequest), createShortLink);

APP.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on http://localhost:${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});

export default APP;
