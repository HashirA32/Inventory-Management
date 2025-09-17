import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout";
import Home from "./pages/Home";
import {
  RouteAddCategory,
  RouteAddProduct,
  RouteAddProductByFile,
  RouteBuyProduct,
  RouteCategoryDetails,
  RouteEditCategory,
  RouteEditProduct,
  RouteIndex,
  RouteProduct,
  RouteProductByCategory,
  RouteProductDetails,
  RouteProductSearch,
  RouteProfile,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
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
import ProductDetails from "./pages/product/ProductDetails";
import BuyProduct from "./pages/product/BuyProduct";
import AddProductByFile from "./pages/product/AddproductByFile";
import SearchResult from "./pages/SearchResult";
import AuthRouteProtection from "./components/AuthRouteProtection";
import OnlyAdminAllow from "./components/OnlyAdminAllow";
import User from "./pages/User";
import ProductByCategory from "./pages/product/ProductsByCategory";

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path={RouteIndex} element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path={RouteProductDetails()}
                element={<ProductDetails />}
              />
              <Route
                path={RouteProductByCategory()}
                element={<ProductByCategory />}
              />
              <Route element={<AuthRouteProtection />}>
                <Route path={RouteProfile} element={<Profile />} />
                <Route path={RouteBuyProduct()} element={<BuyProduct />} />
              </Route>
              <Route element={<OnlyAdminAllow />}>
                <Route path={RouteUser} element={<User />} />
                <Route path={RouteProduct} element={<Product />} />
                <Route path={RouteAddProduct} element={<AddProduct />} />
                <Route
                  path={RouteAddProductByFile}
                  element={<AddProductByFile />}
                />
                <Route path={RouteEditProduct()} element={<EditProduct />} />
                <Route
                  path={RouteCategoryDetails}
                  element={<CategoryDetails />}
                />
                <Route path={RouteAddCategory} element={<AddCategory />} />
                <Route path={RouteEditCategory()} element={<EditCategory />} />
                <Route path={RouteProductSearch()} element={<SearchResult />} />
              </Route>
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
