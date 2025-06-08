import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './register.module.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Паролі не співпадають.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Реєстрація успішна!");
      navigate("/MyReciepts"); // або /login
    } catch (error) {
      alert("Помилка реєстрації: " + error.message);
    }
  };

  return (
    <div className={styles.registerPage}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>Назад</button>
      <div className={styles.registerBox}>
        <h2>Реєстрація</h2>
        <form onSubmit={handleRegister}>
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
          <input
            type="password"
            placeholder="Підтвердіть пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Зареєструватися</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
