import React, { Fragment } from 'react'
import { CgMouse } from "react-icons/cg";
import "../Home/Home.css"
import MetaData from '../MetaData';
import Product from './Product';
const productObj = {
    name :"Govind",
    _id : "1",
    price : "500",
    img : "https://assets.myntassets.com/w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/17/d158792a-f92a-4eac-b9b1-a0f54e8fd59d1647516418438-SS22-Trends-Men-Military-Inspired-Styles.jpg",
    numOfReviews:10

}
const Home = () => {
  return (
    <>
    
    <MetaData title="NextIn-Computer" />
          <div className="banner">
            <p>Welcome to NextIn-Computer</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
          <Product productObj = {productObj}/>
          <Product productObj = {productObj}/>
          <Product productObj = {productObj}/>
          <Product productObj = {productObj}/>
          <Product productObj = {productObj}/>
          <Product productObj = {productObj}/>
          <Product productObj = {productObj}/>
          <Product productObj = {productObj}/>
          </div>
    </>
  )
}

export default Home
