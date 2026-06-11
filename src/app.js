import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static('public'))
app.use(cookieParser())

import userRoute from "./routes/user.routes.js"
import adminRouter from "./routes/admin.routes.js"
import productRouter from "./routes/product.routes.js"
import categoryRouter from "./routes/category.routes.js"
import orderRouter from "./routes/order.routes.js"
import cartRouter from "./routes/cart.routes.js"

app.use("/user",userRoute);
app.use("/admin",adminRouter);
app.use("/product",productRouter);
app.use("/category",categoryRouter);
app.use("/order",orderRouter);
app.use("/cart",cartRouter);

export {app}