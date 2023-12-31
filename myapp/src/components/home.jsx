import banner1 from '../images/banner3.webp'; 
import banner2 from '../images/banner4.webp'; 
import bannerlong from '../images/banner.webp'; 

import { Link } from 'react-router-dom';

import React, { Component } from 'react';
const Home = () => {


    return ( <div>
        <div id="wrapper">
        <main>
            <div className="advert">
                <div id="banners">
                    <img src={banner1} alt="A picture of flowers" className="image_3" />
                    <Link to="/cake" className="textboxForAd">
                        <span className="white-text">Check out new types of cakes.</span>
                    </Link>
                </div>
                <div id="bannerAds2">
                    <img src={banner2} alt="A picture of flowers white-text " className="image_3" />
                    <Link to="/decor" className="textboxForAd">
                        <span className="white-text">Check out decoration packages.</span>
                    </Link>
                </div>
            </div>

            <div id="bannerAdslong">
                <img src={bannerlong} alt="Another picture of flowers" className="image_3" />
            </div>

        </main>
        </div>
        
    </div> 
    );
}
 
export default Home;