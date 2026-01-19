import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "./SignUp.module.css";
import { Button, TextField } from "@mui/material";
import { supabase } from "../../../supabaseClient";
import { inputSx } from "../../../InputStyles";
import LoadingProgress from "../../../components/LoadingProgress/LoadingProgress";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (loading) return;

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      console.error("Full sign up error object:", error);
      setErrorMessage(error.message);
      return;
    }

    if (data.user) {
      navigate("/");
    }
  };

  return (
    <div className={s.signUpPage}>
      <div className={s.content}>
        <h2 className={s.title}>Sign Up</h2>

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
          {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
        </div>

        <Button variant="contained" onClick={handleSignUp}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>

        <footer className={s.footer}>
          <p className={s.footerText}>
            Already have an account?
            <Link className={s.loginLink} to={"/login"}>
              Login
            </Link>
          </p>
        </footer>
      </div>
      <LoadingProgress loading={loading} />
    </div>
  );
};

export default SignUp;
