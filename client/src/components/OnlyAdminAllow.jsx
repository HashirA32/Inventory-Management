import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { IoArrowBackOutline } from "react-icons/io5";
import { RouteIndex } from "./Helpers/RouteNames";

const OnlyAdminAllow = () => {
  const user = useSelector((state) => state.user);

  if (user && user.isLoggedIn && user.user.role === "admin") {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col justify-center gap-10 ">
          <div>
            <Link to={RouteIndex}>
              <Button className="hover: cursor-pointer ">
                <IoArrowBackOutline />
                Back to Home page
              </Button>
            </Link>
          </div>
          <div className="flex justify-center items-center w-[screen] h-[30dvh]">
            Only Admin Can Access these Features.
          </div>
        </div>
      </>
    );
  }
};

export default OnlyAdminAllow;
