import type { User } from "@supabase/supabase-js";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import { Link, useNavigate } from "react-router-dom";
import type { ChartType } from "../../types/ChartType";
import { supabase } from "../../supabaseClient";
import ExpensesPieChart from "../../components/ExpensesPieChart/ExpensesPieChart";
import type { JSX } from "@emotion/react/jsx-runtime";
import s from "./Dashboard.module.css";
import { Button, Menu, MenuItem } from "@mui/material";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const { expenses, loading } = useExpenses(user);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedChart, setSelectedChart] = useState<ChartType>("byCategory");

  const menuOpen = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectChart = (chart: ChartType) => {
    setSelectedChart(chart);
    setAnchorEl(null);
  };

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      setUser(user);
    };
    void init();
  }, [navigate]);

  const getMonthKey = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toISOString().slice(0, 7);
  };

  const { pieLabels, pieValues } = useMemo(() => {
    if (!expenses.length) {
      return { pieLabels: [] as string[], pieValues: [] as number[] };
    }
    const monthSet = new Set<string>();
    for (const e of expenses) {
      monthSet.add(getMonthKey(e.date));
    }
    const months = Array.from(monthSet).sort();
    const lastMonth = months[months.length - 1];

    const expensesForLastMonth = expenses.filter(
      (e) => getMonthKey(e.date) === lastMonth
    );

    const categoryMap = new Map<string, number>();
    for (const e of expensesForLastMonth) {
      const prev = categoryMap.get(e.category) ?? 0;
      categoryMap.set(e.category, prev + e.amount);
    }

    return {
      pieLabels: Array.from(categoryMap.keys()),
      pieValues: Array.from(categoryMap.values()),
    };
  }, [expenses]);

  let chartContent: JSX.Element | null = null;

  if (!user) {
    chartContent = (
      <h2>
        Log in to see dashboard.
        <Link to="/login">Login</Link>
      </h2>
    );
  } else {
    switch (selectedChart) {
      case "byCategory":
        chartContent = (
          <div>
            <h2>Expenses by category (last month)</h2>
            <ExpensesPieChart labels={pieLabels} values={pieValues} />
          </div>
        );
        break;

      case "feature":
        chartContent = <h2>Feature</h2>;
        break;

      case "feature1":
        chartContent = <h2>Feature</h2>;
        break;

      default:
        chartContent = null;
    }
  }

  //NO STYLES YET

  return (
    <div className={s.dashboardPage}>
      <div className={s.content}>
        <h1>Dashboard</h1>
        <Link to="/" className={s.link}>
          Home
        </Link>
        <Button
          variant="contained"
          onClick={handleClick}
          id="chart-menu-btn"
          aria-controls={menuOpen ? "chart-menu" : undefined}
          aria-haspopup="true"
        >
          Choose chart
        </Button>

        <Menu
          id="chart-menu"
          open={menuOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleSelectChart("byCategory")}>
            By category
          </MenuItem>

          <MenuItem onClick={() => handleSelectChart("feature")}>
            Feature
          </MenuItem>

          <MenuItem onClick={() => handleSelectChart("feature1")}>
            Feature
          </MenuItem>
        </Menu>
      </div>
      <div>{chartContent}</div>
      <LoadingProgress loading={loading} />
    </div>
  );
};

export default Dashboard;
