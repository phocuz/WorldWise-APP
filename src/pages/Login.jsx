import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { useAuth } from "../context/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  //login button styling

 const primaryButtonStyle = {
  fontWeight: 700,
  backgroundColor: "var(--color-brand--2)",
  color: "var(--color-dark--1)",
  textTransform: "uppercase",  
  padding: "0.8rem 1.6rem",    
  fontFamily: "inherit",      
  fontSize: "1.5rem",          
  border: "none",
  borderRadius: "5px",         
  cursor: "pointer",           
};

  async function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      await login(email, password);
      navigate("/app");
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button style={primaryButtonStyle} >Login</button>
        </div>
      </form>
    </main>
  );
}