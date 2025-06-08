
import React, { useState } from "react";
import RecipeList from "./RecipeList";
import { Link } from "react-router-dom";

function Desserts() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="container">
      <header id="desserts">
        <h1>Desserts</h1>
      </header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/MyReciepts">My reciepts</Link>
        <Link to="/Login">Profile</Link>
      </nav>
      <input
        type="text"
        placeholder="Пошук рецепта..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: "10px auto",
          padding: "8px",
          fontSize: "1rem",
          width: "100%",
          maxWidth: "400px",
          border: "2px solid #ccc",
          borderRadius: "8px",
          display: "block"
        }}
      />

      <RecipeList searchTerm={searchTerm} />
      <footer>© 2025 Fork & Share</footer>
    </div>
  );
}

export default Desserts;
