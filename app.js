import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import {Item} from './models/items.js';
import {Message} from './models/message.js';

// import seedDatabase from './seeds/itemSeeder.js';

//Set up express server
const app  = express();
app.use(bodyParser.urlencoded({extended:true}));

// Middleware
app.use(bodyParser.json()) 
app.use(cors())

// Mock user for demonstration
const mockUser = {
    username: "admin@gmail.com",
    password: "Password123@"
};
  
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === mockUser.username && password === mockUser.password) {
      return res.json({ success: true, message: "Login successful" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static("public"))

//Connection url
// const url = `mongodb://localhost:27017/bakeryDB`;
const url = `mongodb://127.0.0.1:27017/bakeryDB`
mongoose.connect(url);

//Insert to Item database
const addItems = async () => {
  const existingItemCount = await Item.countDocuments();

  if (existingItemCount === 0) {
    const items = [
      new Item({ title: 'Gourmet Chocolate Assortment', imageSrc: '/images/f7.webp', price: 25.00, likes: 789 }),
      new Item({ title: 'Happy Birthday Cupcake', imageSrc: '/images/f8.jpg', price: 35.00, likes: 642 }),
      new Item({ title: 'Tea Cupcake', imageSrc: '/images/f9.jpg', price: 75.00, likes: 1054 }),
      new Item({ title: 'Basket of flowers with Wine', imageSrc: '/images/f1.webp', price: 45.00, likes: 587 }),
      new Item({ title: 'Mum Birthday Card', imageSrc: '/images/f2.webp', price: 60.00, likes: 876 }),
      new Item({ title: 'Happy Birthday Card', imageSrc: '/images/f3.webp', price: 30.00, likes: 958 }),
      new Item({ title: 'Handcrafted Number Candles', imageSrc: '/images/f10.jpg', price: 50.00, likes: 732 }),
      new Item({ title: 'Fragnance Oil Candles', imageSrc: '/images/f11.jpg', price: 20.00, likes: 521 }),
      new Item({ title: 'Round Cupcakes', imageSrc: '/images/f12.webp', price: 55.00, likes: 896 }),
      new Item({ title: 'White Birthday Cake', imageSrc: '/images/f13.jpg', price: 40.00, likes: 623 }),
      new Item({ title: 'Set of Cupcakes and Decor', imageSrc: '/images/f14.webp', price: 30.00, likes: 789 }),
      new Item({ title: 'Egg Tart with Strawberry', imageSrc: '/images/f15.webp', price: 28.00, likes: 674 }),
      new Item({ title: 'Avocado with Strawberry', imageSrc: '/images/f16.webp', price: 15.00, likes: 432 }),
      new Item({ title: 'Happy Birthday Decoration', imageSrc: '/images/f17.jpeg', price: 45.00, likes: 598 }),
      new Item({ title: 'Pink Set Decoration', imageSrc: '/images/f18.jpg', price: 60.00, likes: 987 }),
      new Item({ title: 'Fruit Birthday Cake', imageSrc: '/images/f19.jpg', price: 35.00, likes: 753 }),
      new Item({ title: 'Happy Balloons', imageSrc: '/images/f20.jpg', price: 18.00, likes: 621 }),
      new Item({ title: 'White Strawberry Cake', imageSrc: '/images/f21.jpg', price: 32.00, likes: 564 }),
      new Item({ title: 'Set 2 Decoration', imageSrc: '/images/f22.jpg', price: 40.00, likes: 874 }),
      new Item({ title: 'Set 2 Cakes', imageSrc: '/images/f23.jpeg', price: 55.00, likes: 932 }),
      new Item({ title: 'Birthday Hats', imageSrc: '/images/f24.jpeg', price: 70.00, likes: 1043 }),
      new Item({ title: 'Cake Box Decoration', imageSrc: '/images/f25.webp', price: 25.00, likes: 765 }),
      new Item({ title: 'Wine from the Clare Valley', imageSrc: '/images/f4.webp', price: 28.00, likes: 724 }),
      new Item({ title: 'Set of Small Tea Box', imageSrc: '/images/f6.webp', price: 15.00, likes: 587 }),
      new Item({ title: 'Birthday Colorful Hats', imageSrc: '/images/f5.webp', price: 45.00, likes: 635 })
      
  
    ];
    
    try {
      await Item.insertMany(items);
      console.log(`Items seeded successfully`);
    } catch (err) {
      console.error("Error seeding items: ", err);
    }
    
    } else {
      console.log("Items already seeded");
    }
};

addItems();


//Insert to Message database
const addMessages = async () => {
  const existingMessageCount = await Message.countDocuments();

  if (existingMessageCount === 0) {
    const messages = [
      new Message({ name: 'Emilia', email: 'emilia.nhoang@gmail.com', phone: 6047815369, message: 'Hi there!' }),
      new Message({ name: 'Liam', email: 'liam2@example.com', phone: 6047815302, message: 'Greetings from Liam!' }),
      new Message({ name: 'Noah', email: 'noah3@example.com', phone: 6047815303, message: 'Hey, how are you?' }),
    new Message({ name: 'Olivia', email: 'olivia4@example.com', phone: 6047815304, message: 'Good day, Olivia here!' }),
    new Message({ name: 'Ava', email: 'ava5@example.com', phone: 6047815305, message: 'Hello, it`s Ava!' }),
    new Message({ name: 'Sophia', email: 'sophia6@example.com', phone: 6047815306, message: 'Salutations, Sophia speaking!' }),
    new Message({ name: 'Charlotte', email: 'charlotte7@example.com', phone: 6047815307, message: 'Hello from Charlotte!' }),
    new Message({ name: 'Mia', email: 'mia8@example.com', phone: 6047815308, message: 'Greetings, it`s Mia!' }),
    new Message({ name: 'Amelia', email: 'amelia9@example.com', phone: 6047815309, message: 'Hi, this is Amelia!' }),
    new Message({ name: 'Harper', email: 'harper10@example.com', phone: 6047815310, message: 'Harper says hello!' }),
    new Message({ name: 'Evelyn', email: 'evelyn11@example.com', phone: 6047815311, message: 'Evelyn here, how can I help?' }),
    new Message({ name: 'Abigail', email: 'abigail12@example.com', phone: 6047815312, message: 'Abigail sending greetings!' }),
    new Message({ name: 'Ella', email: 'ella13@example.com', phone: 6047815313, message: 'Hey there, it`s Ella!' }),
    new Message({ name: 'Scarlett', email: 'scarlett14@example.com', phone: 6047815314, message: 'Greetings from Scarlett!' }),
    new Message({ name: 'Grace', email: 'grace15@example.com', phone: 6047815315, message: 'Hello, Grace here!' }),
    new Message({ name: 'Logan', email: 'logan16@example.com', phone: 6047815316, message: 'Logan says hi!' }),
    new Message({ name: 'Lucas', email: 'lucas17@example.com', phone: 6047815317, message: 'Greetings, it`s Lucas!' }),
    new Message({ name: 'Mason', email: 'mason18@example.com', phone: 6047815318, message: 'Hello from Mason!' }),
    new Message({ name: 'Ethan', email: 'ethan19@example.com', phone: 6047815319, message: 'Ethan here, how can I assist you?' }),
    new Message({ name: 'Caden', email: 'caden20@example.com', phone: 6047815320, message: 'Caden sending his regards!' }),
    new Message({ name: 'Jacob', email: 'jacob21@example.com', phone: 6047815321, message: 'Hello from Jacob!' }),
    new Message({ name: 'Jackson', email: 'jackson22@example.com', phone: 6047815322, message: 'Greetings, it`s Jackson!' }),
    new Message({ name: 'Aiden', email: 'aiden23@example.com', phone: 6047815323, message: 'Hey there, it`s Aiden!' }),
    new Message({ name: 'Oliver', email: 'oliver24@example.com', phone: 6047815324, message: 'Hello, it`s Oliver!' }),
    new Message({ name: 'Elijah', email: 'elijah25@example.com', phone: 6047815325, message: 'Elijah says hi!' })

    ];

    try {
      await Message.insertMany(messages);
      console.log(`Messages seeded successfully`);
    } catch (err) {
      console.error("Error seeding messages: ", err);
    }
  } else {
    console.log("Messages already seeded");
  }
};

addMessages();



// Use the routes at the '/api/' path
app.use("/api/", itemRoutes);
app.use("/api/", messageRoutes);


const port = process.env.port || 5000;

//App configurations
app.set('port', port)

app.listen(port, () => {
    console.log(`The app is up and listening on port ${port}`)
})