import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Auth/SignUp/SignUp";
import View from "./pages/View/View";
import Dashboard from "./pages/Dashboard/Dashboard";
import Percentile from "./pages/Percentile/Percentile";
import SignIn from "./pages/Auth/SignIn/SignIn";
import Export from "./pages/Export/Export";
import Import from "./pages/Import/Import";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/view", element: <View /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/percentile", element: <Percentile /> },
        { path: "/export", element: <Export /> },
        { path: "/import", element: <Import /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
