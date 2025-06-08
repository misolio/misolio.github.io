import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./module.reciepts.css";
import { auth, db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

function MyReciepts() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("baking");
  const [imageFile, setImageFile] = useState(null);
  const location = useLocation();
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const currentCategory = location.pathname.slice(1);
    if (currentCategory && currentCategory !== "MyReciepts") {
      setCategory(currentCategory);
    }
  }, [location.pathname]);

  const fetchRecipes = async () => {
  if (!auth.currentUser) return;
  const token = await auth.currentUser.getIdToken(); 

  try {
    const res = await fetch("/api/recipes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error("Сервер повернув не масив:", data);
      setRecipes([]); // fallback
      return;
    }
    setRecipes(data);
  } catch (err) {
    console.error("Помилка при завантаженні рецептів:", err);
  }
  };


  const handleSaveRecipe = async () => {
  if (!title || !description) {
    alert("Будь ласка, заповніть всі поля!");
    return;
  }

  const token = await auth.currentUser.getIdToken();

  const recipeData = {
    title,
    description,
    category,
    image: imageFile ? null : (editIndex !== null ? recipes[editIndex].image : null),
    timestamp: new Date().toISOString(),
  };

  const finishSave = async (data) => {
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Помилка при збереженні рецепта");
      }

      resetForm();
      fetchRecipes();
    } catch (err) {
      console.error(err);
    }
  };

  if (imageFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      recipeData.image = reader.result;
      finishSave(recipeData);
    };
    reader.readAsDataURL(imageFile);
  } else {
    finishSave(recipeData);
  }
};


  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageFile(null);
    setEditIndex(null);
  };

  const startEditRecipe = (index) => {
    const recipe = recipes[index];
    setTitle(recipe.title);
    setDescription(recipe.description);
    setCategory(recipe.category);
    setImageFile(null);
    setEditIndex(index);
  };

  const deleteRecipe = async (index) => {
    const id = recipes[index].id;
    await deleteDoc(doc(db, "recipes", id));
    const updated = [...recipes];
    updated.splice(index, 1);
    setRecipes(updated);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Мої рецепти</h1>
      </header>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Categories">Categories</Link>
        <Link to="/Login">Profile</Link>
      </nav>

      <section className="form-container">
        <h2>Додати новий рецепт</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Назва рецепту"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опис рецепту"
        ></textarea>

        {location.pathname === "/MyReciepts" && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Baking">Baking</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Desserts">Desserts</option>
            <option value="Lunch">Lunch</option>
            <option value="Main-dishes">Main dishes</option>
            <option value="Snacks">Snacks</option>
          </select>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button onClick={handleSaveRecipe}>
          {editIndex !== null ? "Оновити" : "Додати"}
        </button>
      </section>

      <section className="recipes">
        {recipes.length === 0 ? (
          <p className="no-recipes">Немає доданих рецептів.</p>
        ) : (
          recipes.map((r, idx) => (
            <div key={r.id} className="recipe-card">
            {r.image && <img src={r.image} alt={r.title} />}
            <div className="card-content">
              <h3>{r.title}</h3>
              <p className="description">{r.description}</p>
              <div className="button-group">
                <button className="edit-btn" onClick={() => startEditRecipe(idx)}>Редагувати</button>
                <button className="delete-btn" onClick={() => deleteRecipe(idx)}>Видалити</button>
              </div>
            </div>
          </div>

          ))
        )}
      </section>

      <footer className="footer">© 2025 Fork & Share</footer>
    </div>
  );
}

export default MyReciepts;