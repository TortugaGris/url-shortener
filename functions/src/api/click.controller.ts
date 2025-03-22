import {Response} from "express";
import {AddClickRequest} from "./request.schema";
import {TypedRequestBody} from "./utils.schema";
import {firestore} from "firebase-admin";
import {FieldValue} from "firebase-admin/firestore";

/**
 * Handles incrementing click count of links
 *
 * @param {Object} req - The express request
 * @param {Object} res - The express response
 */
export async function addClick(
  req: TypedRequestBody<typeof AddClickRequest>,
  res: Response,
) {
  const db = firestore();
  const id = req.body.linkId;

  try {
    const docRef = db.collection("links").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).json({
        success: false,
        message: "Link not found",
      });
      return;
    }
    await docRef.update({
      clicks: FieldValue.increment(1),
    });

    const url = doc.data()?.url;

    res.status(200).json({
      success: true,
      url,
      message: "Clicks incremented successfully",
    });
    return;
  } catch (error) {
    console.error("Error incrementing clicks:", error);
    res.status(500).json({
      success: false,
      message: "Failed to increment clicks",
    });
  }
  return;
}
