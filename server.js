import express from "express" // module type
import dotenv from "dotenv/config" // module type
// const express = require("express")
const app = express();
const port = process.env.PORT

app.get('/',(req,res)=>{
    res.send("<h1>First request<h1/>");
})

app.get('/users',(req,res)=>{
    res.send("All Users");
})

app.get('/firstchoice',(req,res)=>{
    res.send("First Choice");
})

app.listen(port,()=>{  
    console.log(`Server running on ${port}`);
})

export {app}