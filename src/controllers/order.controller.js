import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import {Order} from "../models/order.models.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { Product } from "../models/product.models.js";

const createOrder = asyncHandler(async(req,res)=>{

    const {orderItems,address} = req.body;

    if(!orderItems?.length){
        throw new ApiError(400,"Order items required");
    }

    let totalPrice = 0;

    for(const item of orderItems){

        const product =
        await Product.findById(item.productId);

        if(!product){
            throw new ApiError(404,"Product not found");
        }

        if(product.stock < item.quantity){
            throw new ApiError(
                400,
                `${product.name} out of stock`
            );
        }

        product.stock -= item.quantity;
        await product.save();

        totalPrice +=
        product.price * item.quantity;
    }

    const order = await Order.create({
        customer:req.user._id,
        orderItems,
        orderPrice:totalPrice,
        address
    });

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            order,
            "Order placed successfully"
        )
    );
});

const getMyOrders = asyncHandler(async(req,res)=>{

    const orders = await Order.find({
        customer:req.user._id
    })
    .populate("customer","userName")
    .populate("orderItems.productId");

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            orders,
            "Orders fetched successfully"
        )
    );
});

const getAllOrders = asyncHandler(async(req,res)=>{

    const orders = await Order.find()
    .populate("customer","userName email")
    .populate("orderItems.productId");

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            orders,
            "Orders fetched successfully"
        )
    );
});

const updateOrderStatus = asyncHandler(async(req,res)=>{

    const {orderId} = req.params;
    const {status} = req.body;

    const order =
    await Order.findByIdAndUpdate(
        orderId,
        {
            $set:{status}
        },
        {
            new:true
        }
    );

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            order,
            "Order status updated"
        )
    );
});

const cancelOrder = asyncHandler(async(req,res)=>{

    const {orderId} = req.params;

    const order =
    await Order.findById(orderId);

    if(!order){
        throw new ApiError(
            404,
            "Order not found"
        );
    }

    if(
       order.customer.toString()
       !== req.user._id.toString()
    ){
        throw new ApiError(
            403,
            "Unauthorized"
        );
    }

    if(order.status === "DELIVERED"){
        throw new ApiError(
            400,
            "Delivered order cannot be cancelled"
        );
    }

    order.status = "CANCELLED";

    await order.save();

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            order,
            "Order cancelled"
        )
    );
});

export{
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder
}