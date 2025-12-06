import { useAuth } from "../../pages/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import s from "./Navbar.module.css";
import type { FC } from "react";

const Navbar: FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className={s.navbar}>
      <Link to={"/"} className={s.logo}>
        <h1 className={s.title}>Expense Tracker</h1>
      </Link>

      <div className={s.links}>
        {loading ? null : user ? (
          <>
            <button onClick={handleLogout} className={s.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <div className={s.authLinks}>
            <Link to={"/login"} className={s.link}>
              Login
            </Link>
            <Link to={"/signup"} className={s.link}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
