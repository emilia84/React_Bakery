import { createArray } from "../services/createArray";
import Star from "./star";
import React, { Component } from 'react';


const StarRating = ({totalStars = 5, selectedStars = 0, onRate = f=>f}) => {
    
    return ( <>
    {createArray(totalStars).map((n,i)=><Star
        key={i}
        selected={selectedStars>i}
        onSelect={()=>onRate(i+1)}

        />)}
    <p>{selectedStars} of {totalStars}</p>
    </> );
}
 
export default StarRating;