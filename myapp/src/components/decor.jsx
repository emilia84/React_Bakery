import React, { useState, useEffect }  from "react";
import StarRating from "./starRating";


const Decor = ({ itemData }) => {

  const [ratings, setRatings] = useState({});

  const updateRating = (itemId, newRating) => {
    setRatings({ ...ratings, [itemId]: newRating });
  };

  const resetRating = (itemId) => {
    setRatings({ ...ratings, [itemId]: 0 });
  };

  return (
    <div>
      <div id="wrapper">
        <h1>Decoration</h1>
        <div id="products">
          {itemData.length === 0 ? (

            //Conditonal rendering
            <p className="abt">No products available. (Please add a new product!)</p>
          ) : (
            itemData.map((item) => (
              <div className="product" key={item._id}>
                <div className="thumbnail">
                  {/* <img src={item.imageSrc} alt={item.title} className="image_1" /> */}
                  <img src={`http://localhost:5000${item.imageSrc}`} alt={item.title} className="image_1" />
                </div>
                <br />
                <div className="itemDescription">
                  <span className="title">{item.title}</span>
                  <br />
                  <p>From ${item.price}.00 CAD</p>
                  <p>Likes: {item.likes}</p>
                </div>
                
                <StarRating
                  totalStars={5}
                  selectedStars={ratings[item._id] || 0}
                  onRate={(newRating) => updateRating(item._id, newRating)}
                />
                <button className="resetitem" onClick={() => resetRating(item._id)}>Reset Rating</button>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Decor;
