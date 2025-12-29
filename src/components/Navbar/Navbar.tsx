import { useAuth } from "../../pages/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import s from "./Navbar.module.css";
import type { FC } from "react";
import NavButton from "../NavButton/NavButton";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";

const Navbar: FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const { toggleTheme } = useTheme();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleNavigateDashboard = () => {
    navigate("/dashboard");
  };

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleNavigateSignUp = () => {
    navigate("/signup");
  };
  return (
    <nav className={s.navbar}>
      <Link to={"/"} className={s.logo}>
        <h1 className={s.title}>Expense Tracker</h1>
      </Link>

      <div className={s.links}>
        {loading ? null : user ? (
          <div className={s.buttons}>
            <ThemeToggleButton onClick={toggleTheme} />
            <NavButton text="Dashboard" onClick={handleNavigateDashboard} />
            <NavButton text="Logout" onClick={handleLogout} />
          </div>
        ) : (
          <div className={s.buttons}>
            <ThemeToggleButton onClick={toggleTheme} />
            <NavButton text="Login" onClick={handleNavigateLogin} />
            <NavButton text="Sign Up" onClick={handleNavigateSignUp} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
