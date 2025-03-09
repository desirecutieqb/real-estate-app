import express from "express";
import {
    getTenant, createTenant, updateTenant,
    getCurrentResidences
} from "../controllers/tenantControllers";
const router = express.Router();
router.get("/:cognitoId",getTenant);
router.post("/",createTenant);
router.put("/:cognitoId", updateTenant);
router.get("/:cognitoId/current-residences",getCurrentResidences);

export default router;