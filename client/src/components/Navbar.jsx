import { Link } from "react-router-dom";

import { SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { RouteSignIn } from "./Helpers/RouteNames";
import { Button } from "./ui/button";
import { LuLogIn } from "react-icons/lu";
import { useSelector } from "react-redux";
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

const Navbar = () => {
  const user = useSelector((state) => state.user);
  console.log(user.user.avatar);
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

          {!user ? (
            <Link to={RouteSignIn}>
              <Button>
                <LuLogIn />
                Login
              </Button>
            </Link>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.user.avatar || usericon} />
                    <AvatarFallback>HA</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <p>{user.user.name}</p>
                    <p className="text-sm font-light">{user.user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="profile">
                      <FaRegUserCircle />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="">Billing</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="">
                      <FiLogOut className="text-[#990000]" />
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
