import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout";
import Home from "./pages/Home";
import {
  RouteAddCategory,
  RouteAddProduct,
  RouteCategoryDetails,
  RouteEditCategory,
  RouteEditProduct,
  RouteIndex,
  RouteProduct,
  RouteProfile,
  RouteSignIn,
  RouteSignUp,
} from "./components/Helpers/RouteNames";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { ThemeProvider } from "./components/theme-provider";
import Profile from "./pages/Profile";
import CategoryDetails from "./pages/CategoryDetails";
import EditCategory from "./pages/EditCategory";
import AddCategory from "./pages/AddCategory";
import Product from "./pages/product/Product";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path={RouteIndex} element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={RouteProfile} element={<Profile />} />
              {/* Category Routes */}
              <Route
                path={RouteCategoryDetails}
                element={<CategoryDetails />}
              />
              <Route path={RouteAddCategory} element={<AddCategory />} />
              <Route path={RouteEditCategory()} element={<EditCategory />} />

              {/* Product Routes */}
              <Route path={RouteProduct} element={<Product />} />
              <Route path={RouteAddProduct} element={<AddProduct />} />
              <Route path={RouteEditProduct()} element={<EditProduct />} />
            </Route>

            <Route path={RouteSignUp} element={<SignUp />} />
            <Route path={RouteSignIn} element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
