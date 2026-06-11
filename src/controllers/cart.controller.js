import { Cart } from "../models/cart.models.js";
import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addToCart = asyncHandler(async(req,res)=>{

    const {productId,quantity=1} = req.body;

    const product = await Product.findById(productId);

    if(!product){
        throw new ApiError(404,"Product not found");
    }

    let cart = await Cart.findOne({
        customer:req.user._id
    });

    if(!cart){
        cart = await Cart.create({
            customer:req.user._id,
            items:[]
        });
    }

    const existingItem = cart.items.find(
        item => item.product.toString() === productId
    );

    if(existingItem){
        existingItem.quantity += quantity;
    }
    else{
        cart.items.push({
            product:productId,
            quantity
        });
    }

    await cart.save();

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            cart,
            "Product added to cart"
        )
    );
});

const getCart = asyncHandler(async(req,res)=>{

    const cart = await Cart.findOne({
        customer:req.user._id
    }).populate("items.product");

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            cart,
            "Cart fetched"
        )
    );
});

const removeFromCart = asyncHandler(async(req,res)=>{

    const {productId} = req.params;

    const cart = await Cart.findOne({
        customer:req.user._id
    });

    cart.items = cart.items.filter(
        item => item.product.toString() !== productId
    );

    await cart.save();

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            cart,
            "Product removed"
        )
    );
});

const clearCart = asyncHandler(async(req,res)=>{

    const cart = await Cart.findOne({
        customer:req.user._id
    });

    cart.items = [];

    await cart.save();

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Cart cleared"
        )
    );
});

export {
    addToCart,
    getCart,
    removeFromCart,
    clearCart
}