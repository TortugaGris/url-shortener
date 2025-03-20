import express from "express";
import {validate} from "./validation.middleware";
import {CreateShortLinkRequest} from "./short-link.schema";
import {createShortLink} from "./short-link.controller";

const APP = express();

APP.use(express.json());

APP.post("/short-link", validate(CreateShortLinkRequest), createShortLink);

APP.listen((error) => {
  if (error) {
    console.log("Error occurred, server can't start", error);
  }
});

export default APP;
