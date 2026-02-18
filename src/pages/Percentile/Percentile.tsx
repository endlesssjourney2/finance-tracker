import { useState, type MouseEvent } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import s from "./Percentile.module.css";
import Header from "../../components/Header/Header";
import { useAuth } from "../Auth/AuthContext";
import { Link } from "react-router-dom";
import type { PercentileType } from "../../types/PercentileType";
import { Button, Menu, MenuItem } from "@mui/material";
import { percentileLabels } from "../../helpers/PercentileLables";
import PercentileByMonths from "../../components/PercentileByMonths/PercentileByMonths";
import PercentileByCategory from "../../components/PercentileByCategory/PercentileByCategory";

const Percentile = () => {
  const [view, setView] = useState<PercentileType>("byMonths");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorEl);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (next: PercentileType) => {
    setView(next);
    handleClose();
  };

  const { user, loading: authLoading } = useAuth();
  const { expenses, loading: expensesLoading } = useExpenses(user);

  const loading = authLoading || expensesLoading;

  return (
    <div className={s.percentile}>
      <Header title="Set values to see percentile comparison" />

      <Button
        variant="contained"
        onClick={handleOpen}
        aria-controls={menuOpen ? "percentile-view-menu" : undefined}
        aria-haspopup="true"
      >
        {percentileLabels[view]}
      </Button>

      <Menu
        id="percentile-view-menu"
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelect("byMonths")}>By months</MenuItem>

        <MenuItem onClick={() => handleSelect("byCategory")}>
          By category
        </MenuItem>
      </Menu>

      {view === "byMonths" && (
        <PercentileByMonths expenses={expenses} user={user} loading={loading} />
      )}

      {view === "byCategory" && (
        <PercentileByCategory
          expenses={expenses}
          user={user}
          loading={loading}
        />
      )}
      <div className={s.links}>
        <Link to="/" className={s.link}>
          Home
        </Link>
        <Link to="/view" className={s.link}>
          View
        </Link>
      </div>
    </div>
  );
};

export default Percentile;
