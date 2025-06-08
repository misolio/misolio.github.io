import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) return <p>Перевірка доступу...</p>;

  return user ? children : <Navigate to="/login" />;
}
