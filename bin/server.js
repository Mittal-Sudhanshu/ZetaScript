const express=require("express");
const app=express();
require("dotenv").config();
const PORT=process.env.PORT||8000;
const {connectDB}=require("./utils/connectDB");
connectDB();
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
app.use(express.json());
app.use("/api/auth",require("./routes/authRoutes"))