
import './App.css';
import Navbar from './Component/layout/Navbar/Navbar';
import {BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect } from 'react';
import WebFont from "webfontloader";
import Footer from './Component/layout/Footer/Footer';
import Home from './Component/layout/Home/Home.jsx';
import MainRoutes from './Component/MainRoutes/MainRoutes';
function App() {


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

   
  }, []);
  return (
    <>
     <Navbar/>
    <MainRoutes/>
    
     <Footer/>
     </>
  );
}

export default App;
