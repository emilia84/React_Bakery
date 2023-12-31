import { useState, useEffect } from "react";
import { useParams,useNavigate  } from "react-router-dom";

import React, { Component } from 'react';
const Contact = ({ onAdd = f => f }) => {

    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")

    const submitForm = (event) => {
        event.preventDefault();
        onAdd(name,email,phone,message);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");

        // Redirect to the Admin route
        navigate('/admin');
    }

    return ( <div>
        <div id="wrapperForm">
            <h1>Ask us a question!</h1>
            <form onSubmit={submitForm}>
                <fieldset class="form-group">
                <label htmlFor="username">Your Name *</label><br />
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    onChange={(event) => setName(event.target.value)}
                    value={name} 
                /><br />
                <label htmlFor="email">Your Email *</label><br />
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    pattern="^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}$"
                    placeholder="email@example.com"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                    value={email} 
                /><br />
                <label htmlFor="tel">Your Phone Number</label><br />
                <input 
                    type="tel" 
                    name="tel" 
                    id="tel" 
                    placeholder="--- --- ----" 
                    pattern="\d{3}\d{3}\d{4}" 
                    title="Phone number must 10 digits"
                    onChange={(event) => setPhone(event.target.value)}
                    value={phone} 
                /><br />
                <label htmlFor="comment">Your Message *</label><br />
                <textarea 
                    placeholder="Your message" 
                    name="comment" 
                    id="comment" 
                    required
                    onChange={(event) => setMessage(event.target.value)}
                    value={message} 
                ></textarea>
                <input type="submit" className="button" />
                </fieldset>
            </form>
        </div>

        
    </div> 
    );
}
 
export default Contact;