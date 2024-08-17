import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./Contact";
import "./style.css";
import MyList from "./MyList";
import AddProductForm from "./AddProductForm";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import EditProductForm from "./EditProductForm";
import { useSelector } from "react-redux";
import Navbar from "./NavBar";

export default function Index() {
  // Use useSelector hook to access cart state from Redux store
  const cart = useSelector((state) => state.cart.cart); // Access the cart array
  const cartLength = cart.length; // Get the length of the cart array

  return (
    <Router>
      <div>
        <Navbar cartLength={cartLength} />

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AddProductForm" element={<AddProductForm />} />
          <Route path="/product/:id" element={<ProductDetails />} />{" "}
          <Route path="/MyList" element={<MyList />} />
          <Route path="/edit/:id" element={<EditProductForm />} />
        </Routes>
      </div>
    </Router>
  );
}
