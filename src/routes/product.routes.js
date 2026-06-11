import {Router} from 'express'
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {getAllProducts, getProductById} from "../controllers/product.controller.js"

const router = Router();
router.get("/",verifyJwt,getAllProducts);

router.get("/:productId", verifyJwt, getProductById);

export default router;