import express from 'express';
import mongoose from 'mongoose';
import { Message } from '../models/message.js';

const url = 'mongodb://127.0.0.1:27017/bakeryDB'; // Define the MongoDB URL
const router = express.Router();


//1a. READ - Getting all the books

router.get("/messagesinfo", async (req,res)=>{

    try{
        await mongoose.connect(url);
        console.log("Database Connected");

        try{
            const messages = await Message.find()
            console.log(messages);
            res.send(JSON.stringify(messages));

            mongoose.disconnect();
        }
        catch(err){
            console.log(`ERROR in Reading from DB ${err}`)
        }

    }
    catch(err){
        console.log(`ERROR in connection to DB ${err}`)
    }


})

//1b. getting a book by ID
router.get("/messagesinfo/:id", async (req,res)=>{
    //process the request parameter
    let _id = req.params.id;
    _id = new mongoose.Types.ObjectId(_id);

    try{
        await mongoose.connect(url);
        console.log("Database Connected");

        try{
            const message = await Message.findOne({_id})
            console.log(message);
            res.send(JSON.stringify(message));
               
            mongoose.disconnect();
        }
        catch(err){
            console.log(`ERROR in Reading from DB ${err}`)
        }

    }
    catch(err){
        console.log(`ERROR in connection to DB ${err}`)
    }

})

//2. CREATE 
router.post("/addmessage", async (req,res)=>{

    //process the request body
    const {name,email,phone,message} = req.body;

    const newMessage = new Message({name,email,phone,message})

    try{
        await mongoose.connect(url);
        console.log("Database Connected");

        try{
            const savedMessage = await newMessage.save()
            console.log(`Save Successful: ${savedMessage}`);
            res.send(JSON.stringify(savedMessage));
            mongoose.disconnect();
        }
        catch(err){
            console.log(`ERROR in Adding the new document to DB ${err}`)
        }
    }
    catch(err){
        console.log(`ERROR in connection to DB ${err}`)
    }

})


//3. UPDATE 
router.put("/updatemessage/:id", async (req,res)=>{
    //process the request parameter
    let _id = req.params.id;
    _id = new mongoose.Types.ObjectId(_id);

    //process the request body
    const {name,email,phone,message} = req.body;
    const updatedData = {name,email,phone,message}
    
    try{
        await mongoose.connect(url);
        console.log("Database Connected");
        const filter = { _id}
        try {
            const updatedMessage = await Message.findByIdAndUpdate(filter,updatedData, {new:true});
            if (updatedMessage) {
                console.log(`Sucessfully Updated ${updatedMessage}`);
                res.send(JSON.stringify(updatedMessage))
            }
            else {
                console.log(`No matching document could be found `)
                res.send(`No matching document could be found.`)
            }
            mongoose.disconnect();
        }
        catch(err){
            console.log(`ERROR in Updating from DB ${err}`)
            res.send(`ERROR in Updating: ${err}`);
        }
    }
    catch(err){
        console.log(`ERROR in connection to DB ${err}`)
        
    }

})

//4. DELETE - deleting a book by ID
router.delete("/deletemessage/:id", async (req,res)=>{
    //process the request parameter
    let _id = req.params.id;
    _id = new mongoose.Types.ObjectId(_id);

    try{
        await mongoose.connect(url);
        console.log("Database Connected");
        const filter = { _id}
        try {
            const result = await Message.deleteOne(filter);
            if (result.deletedCount === 0) {
                console.log(`No matching document could be found; so deleted none`);
                res.send(`No matching document could be found; so deleted none`)
            }
            else {
                console.log(`Successfully deleted ${result.deletedCount} documents.`)
                res.send(`Successfully deleted ${result.deletedCount} documents.`)
            }
            mongoose.disconnect();
        }
        catch(err){
            console.log(`ERROR in Deleting from DB ${err}`)
            res.send(`ERROR in Deleting: ${err}`)
        }
    }
    catch(err){
        console.log(`ERROR in connection to DB ${err}`)
        
    }

})

export default router;