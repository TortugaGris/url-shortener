import {Response} from "express";
import crypto from "crypto";
import {CreateShortLinkRequest} from "./request.schema";
import {TypedRequestBody} from "./utils.schema";
import {firestore} from "firebase-admin";

/**
 * Handles the creation of a short link
 *
 * @param {Object} req - The express request
 * @param {Object} res - The express response
 */
export async function createShortLink(
  req: TypedRequestBody<typeof CreateShortLinkRequest>,
  res: Response,
) {
  const db = firestore();
  const hash = crypto
    .createHash("sha256")
    .update(req.body.url)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  let offset = 0;
  while (offset + 7 <= hash.length) {
    const docId = hash.slice(offset, offset + 7);
    const docRef = db.collection("links").doc(docId);

    try {
      await docRef.create({url: req.body.url, clicks: 0});
      res.status(200).json({success: true, slug: docId});
      return;
    } catch (e) {
      if (typeof e === "object" && e !== null && "code" in e && e.code === 6) {
        offset++;
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while creating the document.",
        });
        return;
      }
    }
  }
  res.status(400).json({
    success: false,
    message: "No unique slug could be generated.",
  });
  return;
}
