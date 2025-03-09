import express from "express";
import {
    getTenant, createTenant, updateTenant,
    getCurrentResidences,
    addFavoriteProperty,
    removeFavoriteProperty
} from "../controllers/tenantControllers";
const router = express.Router();
router.get("/:cognitoId",getTenant);
router.post("/",createTenant);
router.put("/:cognitoId", updateTenant);
router.get("/:cognitoId/current-residences",getCurrentResidences);
router.post("/:cognitoId/favorite/:propertyId", addFavoriteProperty);
router.delete("/:cognitoId/favorite/:propertyId", removeFavoriteProperty);


export default router;