import React from 'react'
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
const Product = ({productObj}) => {

    const options = {
      edit:false,
      color :" rgba(20,20,20,0.1)",
      activeColor:"tomato",
      size:window.innerWidth < 600 ? 20 : 25,
      value : 4.5,
      isHalf : true
        
      };
  return (
    <Link className="productCard" to={`/product/${productObj._id}`}>
      <img src={productObj.img} alt={productObj.name} />
      <p>{productObj.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({productObj.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${productObj.price}`}</span>
    </Link>
  )
}

export default Product
