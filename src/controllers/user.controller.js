import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
    //get user details from frontend
    const {userName,password,email} = req.body;
    //check if username is empty or not
    if(
        [userName,email,password].some((field)=>field?.trim()=="")
    ){
        throw new ApiError(400,"All Fields are required");
    }
    //check if user or email already exists
    const existedUser = await User.findOne({
        $or:[{userName},{email}]
    })
    if(existedUser){
        throw new ApiError(400,"Username and email already exists");
    }
    //create user object and save
    const user = await User.create({
        userName,
        email,
        password
    })
    //remove password and refresh token
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500,"User registration failed");
    }
    //return response
    return res.status(201).json(
        new ApiResponse(201,createdUser,"User registered successfully")
    )
})

const loginUser = asyncHandler(async(req,res)=>{

    const {userName, password} = req.body;

    if(!userName || !password){
        throw new ApiError(400,"Username and password are required");
    }

    const existedUser = await User.findOne({ userName });

    if(!existedUser){
        throw new ApiError(404,"User does not exist");
    }

    const isPasswordCorrect =
    await existedUser.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid password");
    }

    const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(existedUser._id);

    const loggedInUser = await User
    .findById(existedUser._id)
    .select("-password -refreshToken");

    const options = {
        httpOnly:true,
        secure:false
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1 // this removes field from document
            }
        },
        {
            new:true
        }
    )
    const options = {
        httpOnly: true,
        secure: false
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out"))
})

const refreshAccessToken = asyncHandler(async (req,res)=>{
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
        if(!incomingRefreshToken){
            throw new ApiError(401,"Unauthorized request")
        }
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken");
        if(!user){
            throw new ApiError(401,"Invalid Refresh Token");
        }
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh Token Expired or used")
        }
        const options = {
            httpOnly:true,
            secure:false
        }
        const {accessToken,newRefreshToken} = await 
        generateAccessAndRefreshToken(user._id)

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken, newRefreshToken},
                "Access Token Refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401,"Invalid Refresh Token");   
    }
})

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});    
        return {accessToken,refreshToken};
    } catch (error) {
        throw new ApiError(500,"Error while generating token")
    }
}

const changePassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body;
    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await User.isPasswordCorrect(oldPassword);
    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid Old Password");
    }
    user.password = newPassword;
    await user.save({validateBeforeSave:false});
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password changed successfully"))
})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(new ApiResponse(200,req.user,"User fetched successfully"))
})

const updateAccountDetails = asyncHandler(async(req,res)=>{
    const {userName,email} = req.body;
    if(!userName && !email){
        throw new ApiError(400,"Username or email is required to update")
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                userName:userName,
                email:email
            }
        },
        {
            new:true
        }
    ).select("-password")
    return res
    .status(200)
    .json(new ApiResponse(200,user,"Account details updated successfully"))
})

export{
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    updateAccountDetails,
    getCurrentUser
    
}