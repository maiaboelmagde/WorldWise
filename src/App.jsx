import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  let configRoutes = createBrowserRouter(
    [
      {
        path: "", element: <AppLayout />, children: [
          { path: "/", element: <Homepage /> },
          { path: "/pricing", element: <Pricing /> },
          { path: "/product", element: <Product /> },
          { path: "/login", element: <Login /> },
        ]
      }]
  );
  return (
    <>
      <RouterProvider router={configRoutes} />
    </>
  );
}

export default App
