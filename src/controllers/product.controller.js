import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import {ApiResponse} from "../utils/ApiResponse.js"
import {Product} from "../models/product.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const createProduct = asyncHandler(async(req,res)=>{
    const {name,description,price,category,stock} = req.body;
    if(!name || !description || !price || !category || !stock){
        throw new ApiError(400,"All fields are required");
    }
    const productImageLocalPath = req.files?.productImage?.[0]?.path;
    const productImage = await uploadOnCloudinary(productImageLocalPath);
    if(!productImage){
        throw new ApiError(500,"Product image upload failed")
    } 
    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        owner: req.user?._id,
        productImage: productImage.url
    })
    return res.
    status(201).json(new ApiResponse(200,product,"Product Created Successfully"))
})

const getAllProducts = asyncHandler(async(req,res)=>{
    const product = await Product.find()
    .populate("category","name")
    .populate("owner","userName")
    .sort({createdAt:-1});
    return res
    .status(200)
    .json(new ApiResponse(200,product,"Products fetched successfully"))
})

const getProductById = asyncHandler(async(req,res)=>{
    const {productId} = req.params;
    if(!productId){
        throw new ApiError(400,"Product Id required");
    }
    const product = await Product.findById(productId)
    .populate("owner","userName email")
    .populate("category", "name")
    if(!product){
        throw new ApiError(400,"Can't get Product");
    }
    return res
    .status(200)
    .json(new ApiResponse(200,product,"Successfully get product by Id"))
})

const updateProduct = asyncHandler(async(req,res)=>{
    const {productId} = req.params;
    if(!productId){
        throw new ApiError(400,"Product Id required");
    }
    const product = await Product.findById(productId)
    if(!product){
        throw new ApiError(400,"Can't get Product");
    }
    if (product.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized to update this product");
    }
    const {name,description,price,category,stock} = req.body;
    if(name) product.name = name;
    if(description) product.description = description;
    if(price!=undefined) product.price = price;
    if(category) product.category = category;
    if(stock!=undefined) product.stock = stock;
    const productImagePath = req.file?.path;
    if(productImagePath){
        const uploadedImage = await uploadOnCloudinary(productImagePath);
        if(!uploadedImage?.url){
            throw new ApiError(500,"Unable to upload Product Image");
        }
        product.productImage = uploadedImage.url;
    }
    await product.save();
    return res
    .status(200)
    .json(new ApiResponse(200,product,"Product Updated successfully"))
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const {productId} = req.params;
    if(!productId){
        throw new ApiError(400,"Product Id required");
    }
    const product = await Product.findById(productId)
    if(!product){
        throw new ApiError(400,"Can't get Product");
    }
    if (product.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized to update this product");
    }
    await Product.findByIdAndDelete(productId);
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Product deleted successfully"))
})

export{
    createProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    getProductById
}