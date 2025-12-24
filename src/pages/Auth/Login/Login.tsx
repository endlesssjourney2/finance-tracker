import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { Button, TextField } from "@mui/material";
import s from "./Login.module.css";
import { inputSx } from "../../../InputStyles";
import LoadingProgress from "../../../components/LoadingProgress/LoadingProgress";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) console.error("Error during login:", error.message);

    setLoading(false);

    if (data.session) {
      navigate("/");
    }
  };

  return (
    <div className={s.loginPage}>
      <div className={s.content}>
        <h2 className={s.title}>Login</h2>

        <div className={s.inputContainer}>
          <TextField
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={inputSx}
          />
        </div>

        <Button variant="contained" onClick={handleLogin}>
          {loading ? "Logging in..." : "Sign In"}
        </Button>

        <footer className={s.footer}>
          <p className={s.footerText}>
            Don't have an account?
            <Link className={s.loginSignUp} to={"/signup"}>
              Sign Up
            </Link>
          </p>
        </footer>
      </div>
      <LoadingProgress loading={loading} />
    </div>
  );
};

export default Login;
