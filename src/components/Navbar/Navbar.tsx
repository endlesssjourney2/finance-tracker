import { useAuth } from "../../pages/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import s from "./Navbar.module.css";
import { useState, type FC } from "react";
import NavButton from "../NavButton/NavButton";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import CustomDrawer from "../CustomDrawer/CustomDrawer";
import DrawerBtn from "../CustomDrawer/DrawerBtn";
import PercentIcon from "@mui/icons-material/Percent";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GridViewIcon from "@mui/icons-material/GridView";
import AddHomeIcon from "@mui/icons-material/AddHome";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PublishIcon from "@mui/icons-material/Publish";
import FlagIcon from "@mui/icons-material/Flag";

const Navbar: FC = () => {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const { toggleTheme } = useTheme();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleNavigateDashboard = () => {
    navigate("/dashboard");
  };

  const handleNavigateView = () => {
    navigate("/view");
  };

  const handleNavigateSignIn = () => {
    navigate("/signin");
  };

  const handleNavigateSignUp = () => {
    navigate("/signup");
  };

  const handleNavigatePercentile = () => {
    navigate("/percentile");
  };

  const handleNavigateExport = () => {
    navigate("/export");
  };

  const handleNavigateImport = () => {
    navigate("/import");
  };

  const handleNavigateGoals = () => {
    navigate("/goals");
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
            <NavButton text="Logout" onClick={handleLogout} />
            <NavButton text="Pages" onClick={toggleDrawer} />
            <CustomDrawer
              onClose={toggleDrawer}
              open={open}
              content={
                <>
                  <DrawerBtn
                    text="Home"
                    Icon={AddHomeIcon}
                    onClick={() => navigate("/")}
                  />
                  <DrawerBtn
                    text="View"
                    Icon={GridViewIcon}
                    onClick={handleNavigateView}
                  />
                  <DrawerBtn
                    text="Dashboard"
                    Icon={DashboardIcon}
                    onClick={handleNavigateDashboard}
                  />
                  <DrawerBtn
                    text="Percentile"
                    Icon={PercentIcon}
                    onClick={handleNavigatePercentile}
                  />
                  <DrawerBtn
                    text="Goals"
                    Icon={FlagIcon}
                    onClick={handleNavigateGoals}
                  />
                  <DrawerBtn
                    text="Export"
                    Icon={FileDownloadIcon}
                    onClick={handleNavigateExport}
                  />
                  <DrawerBtn
                    text="Import"
                    Icon={PublishIcon}
                    onClick={handleNavigateImport}
                  />
                </>
              }
            />
          </div>
        ) : (
          <div className={s.buttons}>
            <ThemeToggleButton onClick={toggleTheme} />
            <NavButton text="Sign In" onClick={handleNavigateSignIn} />
            <NavButton text="Sign Up" onClick={handleNavigateSignUp} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
