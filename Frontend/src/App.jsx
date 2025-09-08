import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Login } from "./components/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { ErrorPage } from "./components/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
