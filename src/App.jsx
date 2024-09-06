import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Dashboard from "./pages/admin/Dashboard";
import LoginPage from "./pages/LoginPage";
import AdminRoute from "./pages/admin/ProtectedRoute";
import AdminProduct from "./pages/AdminProduct";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route path="/admin/product" element={<AdminProduct />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
