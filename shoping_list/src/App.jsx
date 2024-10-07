import { useState } from 'react'


import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ShoppingList from './component/ShopingList';
import ItemDetailPage from './pages/ItemDetailPage';


function App() {


  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="ShoppingList"  >
          <Route index element={<ShoppingList/>} />
          <Route  path=":id" element={<ItemDetailPage/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
