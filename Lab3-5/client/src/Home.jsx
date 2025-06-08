import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./main.lab1.css";

function Home() {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/MyReciepts");
  };

  return (
    <div className="container">
      <header>
        <h1>Fork & Share</h1>
      </header>

      <nav className="navbar">
        <div className="nav-right">
          <Link to="/MyReciepts">My Recipes</Link>
          <Link to="/Categories">Categories</Link>
          <Link to="/Login">Profile</Link>
        </div>
      </nav>

      <main>
        <section className="welcome-section">
          <h2>Ласкаво просимо до Fork & Share!</h2>
          <p>
            Це платформа для зберігання, обміну та перегляду кулінарних рецептів.<br />
            Натисніть нижче, щоб почати!
          </p>
          <button onClick={handleCreateClick} className="create-btn">
            Створити новий рецепт
          </button>
        </section>

        <section className="info-section">
          <h2>Чим особлива наша платформа?</h2>
          <ul>
            <li>Зберігання ваших улюблених рецептів у хмарі.</li>
            <li>Можливість переглядати рецепти інших користувачів.</li>
            <li>Просте створення та редагування рецептів.</li>
            <li>Додавання фото до рецептів для натхнення.</li>
            <li>Зручний пошук за категоріями та інгредієнтами.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Як це працює?</h2>
          <ol>
            <li>Зареєструйтесь або увійдіть у свій профіль.</li>
            <li>Перейдіть до «Мої рецепти» та натисніть «Створити».</li>
            <li>Заповніть назву, інгредієнти та інструкції.</li>
            <li>Збережіть і поділіться з іншими!</li>
          </ol>
        </section>

      </main>

      <footer>© 2025 Fork & Share</footer>
    </div>
  );
}

export default Home;
