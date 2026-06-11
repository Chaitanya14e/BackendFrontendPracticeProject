import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Product } from "../models/product.models.js";
import { Order } from "../models/order.models.js";

export const dashboardStats = asyncHandler(async(req,res)=>{

    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    return res
    .status(200)
    .json(
        new ApiResponse(200,{totalUsers,totalProducts,totalOrders},"Dashboard stats send successfully")
    );
});