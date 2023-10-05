import React, { useState } from "react";
import Home from "./Components/Home/Home";
import {Route, Routes } from "react-router-dom";


const api = "https://fakestoreapi.com/products";

function App() {

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
