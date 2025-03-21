import {Response} from "express";
import {AddClickRequest} from "./request.schema";
import {TypedRequestBody} from "./utils.schema";
import {firestore} from "firebase-admin";
import {FieldValue} from "firebase-admin/firestore";

/**
 * Handles the creation of a short link
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
    await docRef.update({
      clicks: FieldValue.increment(1),
    });

    res.status(200).json({
      success: true,
      message: "Clicks incremented successfully",
    });
  } catch (error) {
    console.error("Error incrementing clicks:", error);
    res.status(500).json({
      success: false,
      message: "Failed to increment clicks",
    });
  }
  return;
}
