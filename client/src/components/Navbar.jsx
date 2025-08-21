import { Link, useNavigate } from "react-router-dom";

import { SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { RouteIndex, RouteProfile, RouteSignIn } from "./Helpers/RouteNames";
import { Button } from "./ui/button";
import { LuLogIn } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/images/user.png";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { showToast } from "./Helpers/ShowToast";

import { removeUser } from "../redux/user/user.slice";
import { SiContactlesspayment } from "react-icons/si";
import { getEnv } from "./Helpers/getenv";

const Navbar = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      console.log("Redux user state:", user);
      showToast("success", data.message);
      console.log(user);
      dispatch(removeUser());
      Navigate(RouteIndex);
    } catch (error) {
      showToast("error", error.message);
    }
  };
  return (
    <>
      <nav className="w-full flex items-center justify-between px-3 md:px-6 py-3 shadow-sm h-16 fixed z-50 border-b bg-background/10 backdrop-blur top-0">
        <Link to="/">
          <div className="flex items-center space-x-2 font-bold text-xl">
            <span className="text-[#8B5CF6] text-2xl">HA</span>
            <span>Inventory</span>
          </div>
        </Link>
        <div className="flex items-center gap-3 space-x-2 font-bold text-xl">
          <SidebarTrigger className="sm:hidden" />
          <ModeToggle />

          {!user.isLoggedIn ? (
            <Button asChild>
              <Link to={RouteSignIn}>
                <LuLogIn />
                Login
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user?.user?.avatar || usericon} />
                  <AvatarFallback>HA</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p>{user?.user?.name}</p>
                  <p className="text-sm font-light">{user?.user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor -pointer">
                  <Link to={RouteProfile}>
                    <FaRegUserCircle />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="">
                    <SiContactlesspayment className="text-9xl font-bold " />
                    Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <FiLogOut className="text-[#990000]" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
