import express from "express";
import {
    getTenant, createTenant, updateTenant
} from "../controllers/tenantControllers";
const router = express.Router();
router.get("/:cognitoId",getTenant);
router.post("/",createTenant);
router.put("/:codnitoId", updateTenant)
export default router;