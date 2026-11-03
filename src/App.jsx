import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import AuthedLayout from "./pages/AuthedLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import PageNotFound from "./pages/PageNotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { FakeAuthProvider } from "./context/FakeAuthContext";

function App() {
  let configRoutes = createBrowserRouter(
    [
      {
        path: "", element: <AppLayout />, children: [
          { path: "/", element: <Homepage /> },
          { path: "/pricing", element: <Pricing /> },
          { path: "/product", element: <Product /> },
          { path: "/login", element: <Login /> },
          { path: "*", element: <PageNotFound /> }]
      },
      {path: "app", element: <AuthedLayout />, children: [
        { path: "cities", element: <CityList /> },
        {path: "countries", element: <CountryList /> }
      ]},
      {path: "*", element: <PageNotFound />}
    ]
  );
  return (
    < FakeAuthProvider>
      <RouterProvider router={configRoutes} />
    </FakeAuthProvider>
  );
}

export default App
