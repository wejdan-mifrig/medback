import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    CatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Products = mongoose.model("Products", productsSchema)
export default Products







           // "_id": "69da7dfa0114866483b74659",
            //"name": "Hot Drinks",
            //"description": "All hot beverages like coffee, cappuccino, espresso, and tea",
          //  "createdAt": "2026-04-11T16:59:38.665Z",
           // "updatedAt": "2026-04-11T16:59:38.665Z",
           // "__v": 0
        
          //  "_id": "69da7e510114866483b7465c",
          //  "name": "Cold Drinks",
          //  "description": "Refreshing cold drinks like iced coffee, frappuccino, juices",
          //  "createdAt": "2026-04-11T17:01:05.826Z",
            //  "updatedAt": "2026-04-11T17:01:05.826Z",
            //  "__v": 0
       
            //  "_id": "69da7e640114866483b7465f",
             // "name": "Cakes",
            //  "description": "Fresh cakes, desserts, and sweet bakery items",
            //  "createdAt": "2026-04-11T17:01:24.272Z",
            //  "updatedAt": "2026-04-11T17:01:24.272Z",
            //  "__v": 0