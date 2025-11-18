import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import coldImg from "../img/Logopropio.jpg";
import "../componentes/HeaderAdmin.css";
import HeaderUser from "../componentes/HeaderUser";
import Footer from "../componentes/Footer";
import ProductList from "../componentes/ProductListUser"; 
import Tienda from "../componentes/Tienda";
import ProductListUser from "../componentes/ProductListUser";

export default function UserPanel(){
  return(
   <>
      <div className="page-layout">
        <main className="content-space">
        <ProductListUser></ProductListUser>
        </main>
      </div>
    </>
  );
}