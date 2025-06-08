import React, { useState } from "react";
import { Link } from "react-router-dom";
import './main.lab1.css';

function Categories() {
  const allCategories = [
    {
      to: "/breakfast",
      title: "Breakfast",
      img: "https://st4.depositphotos.com/32856862/40593/i/450/depositphotos_405934468-stock-photo-food-sweet-sandwich-table.jpg"
    },
    {
      to: "/lunch",
      title: "Lunch",
      img: "https://oryoki.de/media/image/news/98/md/bentobox_preview.jpg"
    },
    {
      to: "/desserts",
      title: "Desserts",
      img: "https://www.foodandwine.com/thmb/ckc6L6xKox0WfpfO6dMkuVGPQOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Angel-Food-Cake-with-Three-Berry-Compote-FT-RECIPE0323-541a780b871441e0ab14383ee38acc44.jpg"
    },
    {
      to: "/baking",
      title: "Baking",
      img: "https://shuba.life/static/content/thumbs/738x410/c/1d/7rn2gt---c9x5x50px50p-up--97c0d489195047b3c1b42d46b4a941dc.jpg"
    },
    {
      to: "/main-dishes",
      title: "Main Dishes",
      img: "https://img.freepik.com/premium-photo/roasted-potatoes-with-spices-herbs-kitchen-table-top-view_341862-13420.jpg?w=360"
    },
    {
      to: "/snacks",
      title: "Snacks",
      img: "https://ritakafija.lv/wp-content/uploads/2017/02/nn-1.jpg"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = allCategories.filter((cat) =>
    cat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Fork & Share</h1>
      </header>

      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/MyReciepts">My Recipes</Link>
        <Link to="/Login">Profile</Link>
      </nav>

      <main>
        <input
          type="text"
          placeholder="Пошук категорії..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="categories-scroll">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(({ to, title, img }) => (
              <Link
                key={to}
                to={to}
                className="category-item"
                style={{ backgroundImage: `url('${img}')` }}
              >
                <h2>{title}</h2>
              </Link>
            ))
          ) : (
            <p className="no-results">Категорію не знайдено 😕</p>
          )}
        </div>
      </main>

      <footer>© 2025 Fork & Share</footer>
    </div>
  );
}

export default Categories;
