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
import { Toaster } from "react-hot-toast";


import { FakeAuthProvider } from "./context/FakeAuthContext";
import City from "./components/City";

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
      {
        path: "app", element: <AuthedLayout />, children: [
          { path: "cities", element: <CityList />, },
          { path: "cities/:id", element: <City /> },
          { path: "countries", element: <CountryList /> }
        ]
      },
      { path: "*", element: <PageNotFound /> }
    ]
  );
  return (
    <>
      < FakeAuthProvider>
        <RouterProvider router={configRoutes} />
      </FakeAuthProvider>
      <Toaster position="top-right" />
    </>
  );
}

export default App
