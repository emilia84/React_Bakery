import mongoose from 'mongoose';

// 1. Define the schema
const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please check the entry, no title is specified."]
    },
    imageSrc: {
        type: String, // Assuming imageSrc is a URL or file path to the image
        required: [true, "Please provide an image source."]
    },
    price: {
        type: Number,
        required: [true, "Please provide a price for the cake."]
    },
    likes:{
        type:Number,
        required: [true, "Number of likes is missing. Please provide a value."]
    }
});

// 2. Compile the schema into a model
export const Item = mongoose.model("Item", itemSchema);

