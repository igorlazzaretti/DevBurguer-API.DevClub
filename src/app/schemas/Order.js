import mongoose from "mongoose";
import Category from "../models/Category";

const orderSchema = new mongoose.Schema({
    user: {
        id: {
        type:String,
        requiser: true,
        },
        name: {
        type: String,
        required: true,
        }
    },
    products: [{
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },],
    status: {
        type: String,
        required: true,
    },
},
{
    timestamps: true
});

export default mongoose.model("Order", orderSchema);