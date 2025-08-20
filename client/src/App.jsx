import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout";
import Home from "./pages/Home";
import {
  RouteIndex,
  RouteProfile,
  RouteSignIn,
  RouteSignUp,
} from "./components/Helpers/RouteNames";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { ThemeProvider } from "./components/theme-provider";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path={RouteIndex} element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={RouteProfile} element={<Profile />} />
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
