import Router from "express"
import {createProduct, updateProduct, deleteProduct} from "../controllers/product.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { verifyAdmin } from "../middlewares/admin.middleware.js"
import { createCategory,updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { getAllOrders,updateOrderStatus } from "../controllers/order.controller.js";
import { dashboardStats } from "../controllers/adminDashboard.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = Router();

router.get(
    "/dashboard",
    verifyJwt,
    verifyAdmin,
    dashboardStats
)

router.post(
    "/products",
    verifyJwt,
    verifyAdmin,
    upload.fields([
        {
            name:"productImage",
            maxCount:1
        }
    ]),
    createProduct
);

router.patch(
    "/products/:productId",
    verifyJwt,
    verifyAdmin,
    updateProduct
);

router.delete(
    "/products/:productId",
    verifyJwt,
    verifyAdmin,
    deleteProduct
);

router.post(
    "/categories",
    verifyJwt,
    verifyAdmin,
    createCategory
)

router.patch(
    "/categories/:categoryId",
    verifyJwt,
    verifyAdmin,
    updateCategory
)

router.delete(
    "/categories/:categoryId",
    verifyJwt,
    verifyAdmin,
    deleteCategory
);

router.get(
    "/orders",
    verifyJwt,
    verifyAdmin,
    getAllOrders
)

router.patch(
    "/orders/:orderId",
    verifyJwt,
    verifyAdmin,
    updateOrderStatus
)

export default router;