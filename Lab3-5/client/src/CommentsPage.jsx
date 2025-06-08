import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import "./commentsStyle.css";
import "./main.lab1.css";

function CommentsPage() {
  const { id } = useParams(); // ID рецепта з Firestore
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUserName(currentUser.displayName || currentUser.email || "");
    }

    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRecipe({ id: docSnap.id, ...docSnap.data() });
      } else {
        setRecipe(null);
      }
    };

    const fetchComments = async () => {
      const q = query(collection(db, "comments"), where("recipeId", "==", id));
      const snapshot = await getDocs(q);
      const loadedComments = snapshot.docs.map((doc) => doc.data());
      setComments(loadedComments);
    };

    fetchRecipe();
    fetchComments();
  }, [id]);

  const addComment = async () => {
    if (!userName.trim() || !commentText.trim()) {
      alert("Будь ласка, введіть ім'я та коментар!");
      return;
    }

    const newComment = {
      recipeId: id,
      name: userName,
      text: commentText,
      timestamp: new Date(),
    };

    await addDoc(collection(db, "comments"), newComment);

    setComments((prev) => [...prev, newComment]);
    setCommentText("");
  };

  if (recipe === null) return <p>Рецепт не знайдено.</p>;

  return (
    <div className="comments-page-wrapper">
      <div className="container">
        <h2>Коментарі до: {recipe.title}</h2>
        <button onClick={() => navigate(-1)} className="back-btn">⬅ Назад</button>

        <div className="recipe-details" style={{ marginBottom: "2rem" }}>
          <div
            style={{
              backgroundImage: `url(${recipe.image || "default.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "300px",
              borderRadius: "12px",
              marginBottom: "1rem"
            }}
          />
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          {recipe.category && (
            <p><strong>Категорія:</strong> {recipe.category}</p>
          )}
        </div>

        <div className="comments-section">
          {comments.length === 0 ? (
            <p>Ще немає коментарів.</p>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="comment">
                <strong>{c.name}:</strong> {c.text}
              </div>
            ))
          )}
        </div>

        <input
          type="text"
          placeholder="Ваше ім'я"
          value={userName}
          disabled
        />
        <textarea
          placeholder="Напишіть свій відгук..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <button onClick={addComment}>Додати коментар</button>
      </div>
    </div>
  );
}

export default CommentsPage;
