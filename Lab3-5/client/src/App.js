import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MyReciepts from "./MyReciepts";
import Baking from "./Baking"; 
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Desserts from "./Desserts";
import Main_Dishes from "./main-dishes";
import Snacks from "./Snacks";
import Categories from "./Categories";
import Login from "./Login";
import CommentsPage from "./CommentsPage";
import Register from "./Register";
import ProtectedRoute from "./components/ProtectedRoute";
import UserMenu from "./components/UserMenu"; 
import { useAuth } from "./context/AuthContext";

function App() {
  return (
    <div>
      <UserMenu /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MyReciepts" element={<ProtectedRoute>
            <MyReciepts />
          </ProtectedRoute>} />
        <Route path="/baking" element={<Baking />} /> 
        <Route path="/breakfast" element={<Breakfast />} />
        <Route path="/lunch" element={<Lunch />} />
        <Route path="/desserts" element={<Desserts />} />
        <Route path="/main-dishes" element={<Main_Dishes />} />
        <Route path="/snacks" element={<Snacks />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/comments/:id" element={
          <ProtectedRoute>
            <CommentsPage />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
