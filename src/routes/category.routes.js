import Router from "express";
import {
    getAllCategories,
    getCategoryById
} from "../controllers/category.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/",verifyJwt,getAllCategories);
router.get("/:categoryId", verifyJwt, getCategoryById);

export default router;