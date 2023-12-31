import express from 'express';
import mongoose from 'mongoose';
import { Item } from '../models/items.js';

const url = 'mongodb://127.0.0.1:27017/bakeryDB'; // Define the MongoDB URL
const router = express.Router();


//1a. READ - Getting all the books

router.get("/itemsinfo", async (req,res)=>{

    try{
        await mongoose.connect(url);
        console.log("Database Connected");

        try{
            const items = await Item.find()
            console.log(items);
            res.send(JSON.stringify(items));

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

router.get("/itemsinfo/:id", async (req,res)=>{
    //process the request parameter
    let _id = req.params.id;
    _id = new mongoose.Types.ObjectId(_id);

    try{
        await mongoose.connect(url);
        console.log("Database Connected");

        try{
            const item = await Item.findOne({_id})
            console.log(item);
            res.send(JSON.stringify(item));
               
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

router.post("/additem", async (req,res)=>{

    //process the request body
    const {title,imageSrc,price,likes} = req.body;

    const newItem = new Item({title,imageSrc,price,likes})

    try{
        await mongoose.connect(url);
        console.log("Database Connected");

        try{
            const savedItem = await newItem.save()
            console.log(`Save Successful: ${savedItem}`);
            res.send(JSON.stringify(savedItem));
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

router.put("/updateitem/:id", async (req,res)=>{
    //process the request parameter
    let _id = req.params.id;
    _id = new mongoose.Types.ObjectId(_id);

    //process the request body
    const {title,imageSrc,price, likes} = req.body;
    const updatedData = {title,imageSrc,price, likes}
    
    try{
        await mongoose.connect(url);
        console.log("Database Connected");
        const filter = { _id}
        try {
            const updatedItem = await Item.findByIdAndUpdate(filter,updatedData, {new:true});
            if (updatedItem) {
                console.log(`Sucessfully Updated ${updatedItem}`);
                res.send(JSON.stringify(updatedItem))
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

router.delete("/deleteitem/:id", async (req,res)=>{
    //process the request parameter
    let _id = req.params.id;
    _id = new mongoose.Types.ObjectId(_id);

    try{
        await mongoose.connect(url);
        console.log("Database Connected");
        const filter = { _id}
        try {
            const result = await Item.deleteOne(filter);
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