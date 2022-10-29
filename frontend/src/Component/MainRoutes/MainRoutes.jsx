import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../layout/Home/Home.jsx'
import Loder from '../layout/Loader/Loder.jsx'
import ProductDetails from '../Product/ProductDetails.jsx'

const MainRoutes = () => {
  return (
    <Routes>
    <Route  path="/" element={<Home/>} />
    <Route  path="/product/:id" element={<ProductDetails/>} />
    <Route  path="/load" element={<Loder/>} />
    </Routes>
  )
}

export default MainRoutes
