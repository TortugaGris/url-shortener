import express from "express";
import {validate} from "./validation.middleware";
import {AddClickRequest, CreateShortLinkRequest} from "./request.schema";
import {createShortLink} from "./short-link.controller";
import {addClick} from "./click.controller";

const APP = express();

APP.use(express.json());

APP.post("/short-link", validate(CreateShortLinkRequest), createShortLink);
APP.post("/click", validate(AddClickRequest), addClick);

APP.listen((error) => {
  if (error) {
    console.log("Error occurred, server can't start", error);
  }
});

export default APP;
