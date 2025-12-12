import type { User } from "@supabase/supabase-js";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import { Link, useNavigate } from "react-router-dom";
import type { ChartType } from "../../types/ChartType";
import { supabase } from "../../supabaseClient";
import s from "./Dashboard.module.css";
import { Button, Menu, MenuItem } from "@mui/material";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { chartLabels } from "../../helpers/chartLabels";
import {
  buildCategoryPieForLastMonth,
  buildMonthlyTotals,
} from "../../helpers/expensesCharts";
import { DashboardChartContent } from "../../components/DashboardChartContent/DashboardChartContent";

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

  const { pieLabels, pieValues } = useMemo(() => {
    return buildCategoryPieForLastMonth(expenses);
  }, [expenses]);

  const { monthLabels, monthValues } = useMemo(() => {
    return buildMonthlyTotals(expenses);
  }, [expenses]);

  return (
    <div className={s.dashboardPage}>
      <header className={s.header}>
        <h1 className={s.headerTitle}>Dashboard</h1>
      </header>
      <div className={s.content}>
        <div className={s.menuBar}>
          <Button
            variant="contained"
            onClick={handleClick}
            id="chart-menu-btn"
            aria-controls={menuOpen ? "chart-menu" : undefined}
            aria-haspopup="true"
          >
            {chartLabels[selectedChart]}
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

            <MenuItem onClick={() => handleSelectChart("byMonths")}>
              By months
            </MenuItem>

            <MenuItem onClick={() => handleSelectChart("feature1")}>
              Feature
            </MenuItem>
          </Menu>
          <div className={s.links}>
            <Link to="/" className={s.link}>
              Home
            </Link>
            <Link to="/view" className={s.link}>
              View
            </Link>
          </div>
        </div>
        <DashboardChartContent
          user={user}
          selectedChart={selectedChart}
          pieLabels={pieLabels}
          pieValues={pieValues}
          monthLabels={monthLabels}
          monthValues={monthValues}
        />
      </div>
      <LoadingProgress loading={loading} />
    </div>
  );
};

export default Dashboard;
