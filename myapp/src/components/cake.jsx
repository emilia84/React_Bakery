import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/productAPI';
import StarRating from "./starRating";

// Function to shuffle an array
const shuffleArray = (array) => {
  const shuffled = array.slice(); // Make a copy of the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};

// Prepare the shuffled names
const shuffledNames = shuffleArray([
  "Chocolate Delight",
  "Vanilla Dream",
  "Red Velvet Romance",
  "Strawberry Shortcake",
  "Caramel Charm",
  "Lemon Luxe",
  "Raspberry Rapture",
  "Black Forest Bliss",
  "Toffee Temptation",
  "Coconut Cloud",
  "Peach Perfection",
  "Blueberry Bliss",
  "Hazelnut Harmony",
  "Pineapple Paradise",
  "Mint Marvel",
  "Orange Obsession",
  "Banana Bonanza",
  "Almond Adventure",
  "Coffee Craze",
  "Pistachio Pleasure",
  "Maple Magic",
  "Cherry Cheer",
  "Apple Ambrosia",
  "Ginger Glitz",
  "Matcha Mystique"
]);

// Function to generate a name and price for a product
const generateProductInfo = (product, index) => {
  const priceOptions = [50, 45, 40, 35, 30, 25, 20, 15, 10];
  const randomPrice = priceOptions[index % priceOptions.length];

  return {
    ...product,
    title: shuffledNames[index], // Assign a shuffled name
    price: randomPrice.toFixed(2) // Ensure the price has two decimal places
  };
};

const Cake = () => {
  const [products, setProducts] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    fetchProducts()
      .then(fetchedProducts => {
        // Assign a name and a price to each product
        const productsWithInfo = fetchedProducts.slice(0, 25).map((product, index) => generateProductInfo(product, index));
        setProducts(productsWithInfo);
      })
      .catch(error => {
        console.log("Error in component:", error);
      });
  }, []);

  // Function to update the rating for a product
  const handleRating = (productId, rating) => {
    setRatings({ ...ratings, [productId]: rating });
  };

  // Function to reset the rating for a product
  const resetRating = (productId) => {
    setRatings({ ...ratings, [productId]: 0 });
  };

  return (
    <div>
      <div id="wrapper">
        <h1>Cake & Desert</h1>
        <div id="products">
          {products.map(product => (
            <div className="product" key={product.id}>
              <div className="thumbnail">
                <img src={product.largeImageURL} alt="Thumbnail" className="image_2" />
              </div>
              <div className="itemDescription">
                <span className="title">{product.title}</span>
                <br />
                
                <p>From ${product.price} CAD</p>
                <p>Likes: {product.likes}</p>
              </div>
              <StarRating
                totalStars={5}
                selectedStars={ratings[product.id] || 0}
                onRate={(rating) => handleRating(product.id, rating)}
              />
              <button className="resetitem" onClick={() => resetRating(product.id)}>Reset Rating</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cake;
