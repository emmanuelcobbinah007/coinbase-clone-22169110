import React from "react";
import Layout from "./layout";
import AuthLayout from "./AuthLayout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Dashboard from "./pages/Dashboard";
import PageInProgress from "./pages/PageInProgress";
import CryptoDetail from "./pages/CryptoDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/explore",
        element: <Explore />
      },
      {
        path: "/crypto/:symbol",
        element: <CryptoDetail />
      },
      {
        path: "*",
        element: <NotFound />
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/dashboard/in-progress/:section",
    element: <PageInProgress />
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
