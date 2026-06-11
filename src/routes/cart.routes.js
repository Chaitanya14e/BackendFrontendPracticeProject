import Router from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {addToCart,getCart,removeFromCart,clearCart} from "../controllers/cart.controller.js"
const router = Router();

router.post(
    "/",
    verifyJwt,
    addToCart
);

router.get(
    "/",
    verifyJwt,
    getCart
);

router.delete(
    "/:productId",
    verifyJwt,
    removeFromCart
);

router.delete(
    "/",
    verifyJwt,
    clearCart
);

export default router;