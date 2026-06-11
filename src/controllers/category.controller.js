import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import {Category} from "../models/category.models.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const createCategory = asyncHandler(async(req,res)=>{
    const {name} = req.body;
    if(!name){
        throw new ApiError(400,"Category name is required");
    }
    const category = await Category.create({
        name
    })
    return res
    .status(201)
    .json(new ApiResponse(201,category,"Category created successfully"))
})

const getAllCategories = asyncHandler(async(req,res)=>{
    const category = (await Category.find()).sort({createdAt:-1});
    return res
    .status(200)
    .json(new ApiResponse(200,category,"Categories fetched successfully"))
})

const getCategoryById = asyncHandler(async(req,res)=>{
    const {categoryId} = req.params;
    if(!categoryId){
        throw new ApiError(400,"Category Id required");
    }
    const category = await Category.findById(categoryId);
    if(!category){
        throw new ApiError(400,"Can't get category");
    }
    return res
    .status(200)
    .json(new ApiResponse(200,category,"Successfully get category by Id"))
})

const updateCategory = asyncHandler(async(req,res)=>{
    const {categoryId} = req.params;
    const {name} = req.body;
    if(!categoryId){
        throw new ApiError(400,"Category Id required");
    }
    if(!name){
        throw new ApiError(400,"Category name is required");
    }
    const category = await Category.findByIdAndUpdate(
        categoryId,
        {name},
        {new:true}
    )
    if(!category){
        throw new ApiError(400,"Can't update category");
    }
    return res
    .status(200)
    .json(new ApiResponse(200,category,"Category updated successfully"))
})

const deleteCategory = asyncHandler(async(req,res)=>{
    const {categoryId} = req.params;
    if(!categoryId){
        throw new ApiError(400,"Category Id required");
    }
    const category = await Category.findByIdAndDelete(categoryId);
    if(!category){
        throw new ApiError(400,"Can't delete category");
    }
    return res
    .status(200)
    .json(new ApiResponse(200,category,"Category deleted successfully"))
})

export{
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}