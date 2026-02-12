import type { User } from "@supabase/supabase-js";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { useExpenses } from "../../hooks/useExpenses";
import { Link } from "react-router-dom";
import type { ChartType } from "../../types/ChartType";
import { supabase } from "../../supabaseClient";
import s from "./Dashboard.module.css";
import { Button, Menu, MenuItem } from "@mui/material";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import { chartLabels } from "../../helpers/chartLabels";
import {
  buildCategoryPieForLastMonth,
  buildLast6Months,
  buildMonthlyTotals,
} from "../../helpers/expensesCharts";
import { DashboardChartContent } from "../../components/DashboardChartContent/DashboardChartContent";
import Header from "../../components/Header/Header";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user ?? null);
    };

    void init();
  }, []);

  const { expenses, loading } = useExpenses(user);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedChart, setSelectedChart] = useState<ChartType>("byCategory");

  const menuOpen = Boolean(anchorEl);
  const isLoading = user === null || loading;

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

  const { pieLabels, pieValues } = useMemo(() => {
    return buildCategoryPieForLastMonth(expenses);
  }, [expenses]);

  const { monthLabels, monthValues } = useMemo(() => {
    return buildMonthlyTotals(expenses);
  }, [expenses]);

  const { sixMonthsLabels, sixMonthsValues } = useMemo(() => {
    return buildLast6Months(expenses);
  }, [expenses]);

  return (
    <div className={s.dashboardPage}>
      <Header title="Dashboard" />
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
              By category (Last month)
            </MenuItem>

            <MenuItem onClick={() => handleSelectChart("byMonths")}>
              By months (Total)
            </MenuItem>

            <MenuItem onClick={() => handleSelectChart("byLast6Months")}>
              Last 6 months
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
        {!isLoading && (
          <DashboardChartContent
            user={user}
            selectedChart={selectedChart}
            pieLabels={pieLabels}
            pieValues={pieValues}
            monthLabels={monthLabels}
            monthValues={monthValues}
            sixMonthsLabels={sixMonthsLabels}
            sixMonthsValues={sixMonthsValues}
          />
        )}
      </div>
      <LoadingProgress loading={loading} />
    </div>
  );
};

export default Dashboard;
