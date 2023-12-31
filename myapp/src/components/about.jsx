import aboutusImage from '../images/aboutus4.jpg'; // Import the image

import React, { Component } from 'react';

//sfc 

const About = () => {


    return ( <div>
        <div id="wrapper">
            <h1>Our Story</h1>
            <img src={aboutusImage} alt="Floral people" className="image_3" />
            <h2 id="welcome">Welcome!</h2>
            {/* <div id="box11"> */}
                <p className="abt">
                Emi's Bakery is your go-to online patisserie, dedicated to sweetening your celebrations and daily life with our delectable baked goods.<br />
                <br />
                <strong>Savor the Sweetness, Cherish the Value</strong><br />
                <br/>
                Looking for a sweet deal? Your quest ends here! At Emi's Bakery, we offer tempting treats that won’t break the bank. Whether you're planning a grand celebration or seeking comfort in the form of confectioneries, we provide options for every budget without compromising on quality.<br />
                <br /><strong>Delight in Every Bite</strong><br />
                <br/>
                From the classic elegance of a rich chocolate torte to the playful charm of sprinkle-covered cupcakes, our bakery brings you an array of treats that cater to every taste. With recipes that have traveled from all corners of the globe to your doorstep, Emi's Bakery is committed to infusing your life with a dash of sweetness and a sprinkle of joy. 
                
                </p>
            {/* </div> */}
        </div>
        
    </div> 
    );
}
 
export default About;