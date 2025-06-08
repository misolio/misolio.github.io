import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function RecipeList({ searchTerm = "" }) {
  const [recipes, setRecipes] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipesAndComments = async () => {
      const currentCategory = location.pathname.slice(1);
      let q = collection(db, "recipes");

      if (currentCategory && currentCategory !== "Categories") {
        q = query(q, where("category", "==", currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)));
      }

      const recipeSnapshot = await getDocs(q);
      const fetchedRecipes = recipeSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setRecipes(fetchedRecipes);

      const newCommentsMap = {};
      for (const recipeDoc of recipeSnapshot.docs) {
        const commentsSnap = await getDocs(
          query(collection(db, "comments"), where("recipeId", "==", recipeDoc.id))
        );
        newCommentsMap[recipeDoc.id] = commentsSnap.docs.map(doc => doc.data());
      }

      setCommentsMap(newCommentsMap);
    };

    fetchRecipesAndComments();
  }, [location.pathname]);

  const filteredBySearch = recipes.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="recipes">
      {filteredBySearch.length === 0 ? (
        <p>Немає рецептів у цій категорії.</p>
      ) : (
        filteredBySearch.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
            style={{ backgroundImage: `url(${recipe.image})` }}
          >
            <div className="recipe-overlay">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <p>Категорія: {recipe.category}</p>
              <div className="button-group">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/comments/${recipe.id}`)}
                >
                  Переглянути коментарі
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default RecipeList;
