import { useEffect, useState } from "react";
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
import Home from "./pages/shopping-view/Home";
import Checkout from "./pages/shopping-view/Checkout";
import Account from "./pages/shopping-view/Account";
import Checkauth from "./pages/common/Checkauth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import Listing from "./pages/shopping-view/Listing";
import SearchProducts from "./pages/shopping-view/Search";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import Footer from "./components/common/Footer";
import Help from "./pages/common/Help";
import Returns from "./pages/common/Returns";
import Privacy from "./pages/common/Privacy";
import Terms from "./pages/common/Terms";
import Index from "./pages/not-found/Index";

export default function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  // console.log(isAuthenticated);
  // console.log(user);

  const dispatch = useDispatch();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("jsx: ", token);
    
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <Checkauth
              isAuthenticated={isAuthenticated}
              user={user}
            ></Checkauth>
          }
        ></Route>
        <Route
          path="/auth"
          element={
            <Checkauth isAuthenticated={isAuthenticated} user={user}>
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
            <Checkauth isAuthenticated={isAuthenticated} user={user}>
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
            <Checkauth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </Checkauth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="/common">
          {/* Nested Routes */}
          <Route path="help" element={<Help />} />
          <Route path="returns" element={<Returns />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
        <Route path="/*" element={<Index />} />
      </Routes>
      <Footer />
    </div>
  );
}
