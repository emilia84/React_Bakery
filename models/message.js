import mongoose from 'mongoose';

// 1. Define the schema
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."]
    },
    email: {
        type: String,
        required: [true, "Please provide an email."]

    },
    phone: {
        type: Number,
    },
    message:{
        type:String,
        required: [true, "Please provide a message."]
    }
});

// 2. Compile the schema into a model
export const Message = mongoose.model("Message", messageSchema);

