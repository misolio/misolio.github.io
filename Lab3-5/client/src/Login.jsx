import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './login.module.css';
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/MyReciepts");
    } catch (error) {
      alert("Помилка входу: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };


  if (currentUser) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.authorizedBox}>
          <h2>Ви увійшли як {currentUser.email}</h2>
          <p>Ви вже в системі. Можете перейти до своїх рецептів або вийти.</p>
          <button onClick={() => navigate("/MyReciepts")}>Перейти до моїх рецептів</button>
          <button onClick={handleLogout}>Вийти</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loginPage}>
      <button
          className={styles.backBtn}
          onClick={() => {
            const prevUrl = document.referrer;
            if (prevUrl.includes("/login"))  {
              navigate(-1);
            } else {
              navigate("/");
            }
          }}
        >
          Назад
     </button>

      <div className={styles.loginBox}>
        <h2>Вхід до Fork & Share</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Увійти</button>
        </form>
        <p>
          Ще не маєте акаунта?{" "}
          <span
            className={styles.registerLink}
            onClick={() => navigate("/register")}
          >
            Зареєструватися
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
