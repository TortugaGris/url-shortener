import {Response} from "express";
import crypto from "crypto";
import {CreateShortLinkRequest} from "./short-link.schema";
import {TypedRequestBody} from "./utils.schema";

/**
 * Handles the creation of a short link
 *
 * @param {Object} req - The express request
 * @param {Object} res - The express response
 */
export function createShortLink(
  req: TypedRequestBody<typeof CreateShortLinkRequest>,
  res: Response,
) {
  const hash = crypto.createHash("sha256").update(req.body.url).digest("hex");
  res.send({slug: hash});
}
