import Router from "express";
import {
    createOrder,
    getMyOrders,
    cancelOrder
} from "../controllers/order.controller.js";

import { verifyJwt }
from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/",
    verifyJwt,
    createOrder
);

router.get(
    "/my-orders",
    verifyJwt,
    getMyOrders
);

router.patch(
    "/:orderId/cancel",
    verifyJwt,
    cancelOrder
);

export default router;