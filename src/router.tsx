import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import View from "./pages/View/View";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/view", element: <View /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
