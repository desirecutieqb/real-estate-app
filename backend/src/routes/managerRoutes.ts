import express from "express";
import {
    getManager, createManager,
    updateManager
} from "../controllers/managerControllers";
const router = express.Router();
router.get("/:cognitoId",getManager);
router.post("/",createManager);
router.put("/:cognitoId", updateManager)


export default router;