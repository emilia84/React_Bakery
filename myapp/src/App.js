import Footer from './components/footer';
import Header from './components/header';
import NavBar from './components/navbar';
import About from './components/about';
import Home from './components/home';
import Contact from './components/contact';
import Cake from './components/cake';
import Decor from './components/decor';
import React, { useEffect, useState  } from "react";
import axios from 'axios';
import {Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './styles.css';
import './App.css';
import Admin from './components/admin';
import AddItem from './components/addItem';
import UpdateItem from './components/updateItem';
import NotAdmin from './components/notAdmin';

function App() {
  const navigate = useNavigate();
 

  //////////////////CONNECT DATABASE TO CLIENT 
  // 1. Define a state variable
  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);

  // 2a. Fetch Items database
  useEffect(()=>{
    //axios or fetch

    const fetchData = async () => {

      const url = `http://localhost:5000/api/itemsinfo`;

      try {
        const data = await fetch(url);
        const response = await data.json();
        console.log(response);
        setItems(response);
      }
      catch (err) {
        console.log(`ERROR in fetching data: ${err}`)
      }
    }
    fetchData();
  }, [])

  // 2b. Fetch Messages database
  useEffect(()=>{
    //axios or fetch

    const fetchData = async () => {

      const url = `http://localhost:5000/api/messagesinfo`;

      try {
        const data = await fetch(url);
        const response = await data.json();
        console.log(response);
        setMessages(response);
      }
      catch (err) {
        console.log(`ERROR in fetching data: ${err}`)
      }
    }
    fetchData();
  }, [])

  //3. Adding the new message to the database

  const handleAddMessage = async (name,email,phone,message) => {
    console.log("Add Handled Messages");
    const url = `http://localhost:5000/api/addmessage`;
    try {
      const { data, status } = await axios.post(url, { name,email,phone,message })
      console.log(data, status)
      if (status == 200) {
        setMessages([...messages, data]);
        navigate("/");
      }
      else {
        console.log("error in adding the book")
      }
    }
    catch (err) {
      console.log(`ERROR in ADDING the book: ${err}`)
    }
  }

  //4. Handling the delete event
  //delete from DB and also from UI

  const handleDelete = async (itemToDelete) => {
    console.log("Delete handled");
    const url = `http://localhost:5000/api/deleteitem/${itemToDelete._id}`;
    try {
      const { data, status } = await axios.delete(url);
      console.log(status);
      if (status == 200) {
        const newItems = items.filter(item => item._id !== itemToDelete._id)
        setItems(newItems);
      }
      else {
        console.log("error in deleting the book")
      }
    }
    catch (err) {
      console.log(`ERROR in deleting the book: ${err}`)
    }
  }

  //5. Adding the new cake to the database

  const handleAdd = async (title, imageSrc, price, likes) => {
    console.log("Add Handled");
    const url = `http://localhost:5000/api/additem`;
    try {
      const { data, status } = await axios.post(url, { title, imageSrc, price, likes })
      console.log(data, status)
      if (status == 200) {
        setItems([...items, data]);
        navigate("/");
      }
      else {
        console.log("error in adding the book")
      }
    }
    catch (err) {
      console.log(`ERROR in ADDING the book: ${err}`)
    }
  }

  //6. Handling the Update Cake
  const handleUpdate = async (id, title, imageSrc, price, likes) => {
    console.log("Update Handled");
    const url = `http://localhost:5000/api/updateitem/${id}`;

    try {
      const { data, status } = await axios.put(url, { title, imageSrc, price, likes })
      console.log(data, status)
      if (status == 200) {

        const index = items.findIndex(item => item._id === id);

        const newItems = [...items];
        newItems[index] = data;
        setItems(newItems)

        navigate("/");
      }
      else {
        console.log("error in updating the book")
      }
    }
    catch (err) {
      console.log(`ERROR in UPDATING the book: ${err}`)
    }
  }




  //////////////////LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/notadmin'); // Redirect to the login page after logout
  };
  

  return (
    <div className="App">
      <Header/>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact onAdd={handleAddMessage}/>}/>
        <Route path="/cake" element={<Cake/>}/>
        <Route
        path="/decor"
        element={
          <Decor
            itemData={items}
          />
        }
        />
        <Route path="/notadmin" element={<NotAdmin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin" element={isLoggedIn ? <Admin itemData={items} onDelete={handleDelete} onUpdate={handleUpdate} onLogout={handleLogout} /> : <Navigate to="/notadmin" />} />

        <Route path="/additem" element={<AddItem onAdd={handleAdd} />} />
        <Route path="/updateitem/:id" element={<UpdateItem onUpdate={handleUpdate} />} />
  

      </Routes>
      <Footer/>

    </div>
  );
}

export default App;
