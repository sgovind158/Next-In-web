
import './App.css';
import Navbar from './Component/layout/Navbar/Navbar';
import {BrowserRouter } from "react-router-dom"
import { useEffect } from 'react';
import WebFont from "webfontloader";
function App() {


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

   
  }, []);
  return (
    <BrowserRouter >
     <Navbar/>
    </BrowserRouter>
  );
}

export default App;
