import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/AdminLayout";
import Dashboard from "./pages/admin-view/Dashboard";
import Products from "./pages/admin-view/Products";
import Orders from "./pages/admin-view/Orders";
import Features from "./pages/admin-view/Features";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import Index from "./pages/not-found";
import Home from "./pages/shopping-view/Home";
import Listing from "./pages/shopping-view/Listing";
import Checkout from "./pages/shopping-view/Checkout";
import Account from "./pages/shopping-view/Account";
import Checkauth from "./pages/common/Checkauth";

export default function App() {
  const isAuthenticate = false;
  const user =  null
  // {
  //   name: 'Ishu',
  //   role: 'admin'
  // };
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <Checkauth isAuthenticate={isAuthenticate} user={user}>
              {/* Children */}
              <AuthLayout />
            </Checkauth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <Checkauth isAuthenticate={isAuthenticate} user={user}>
              <AdminLayout />
            </Checkauth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="features" element={<Features />} />
        </Route>
        <Route
          path="/user"
          element={
            <Checkauth isAuthenticate={isAuthenticate} user={user}>
              <ShoppingLayout />
            </Checkauth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="/*" element={<Index />} />
      </Routes>
    </div>
  );
}
