import express from "express";
import {
  getManager,
  createManager,
  updateManager,
  getManagerProperties,
} from "../controllers/managerControllers";

const router = express.Router();

router.get("/:cognitoId", getManager);
router.post("/", createManager);
router.get("/:cognitoId/properties", getManagerProperties);
router.put("/:cognitoId", updateManager);

export default router;
