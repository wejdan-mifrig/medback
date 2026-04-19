import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./router/user.routes.js";
import categoriesRoutes from "./router/categories.routes.js";
import productsRoutes from "./router/products.routes.js"; 
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5000",  
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", userRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", productsRoutes); 

connectDB();

app.listen(process.env.PORT, () => {
    console.log("connected on port: ", process.env.PORT);
});