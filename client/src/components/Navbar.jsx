import { Link } from "react-router-dom";

import { SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { RouteSignIn } from "./Helpers/RouteNames";

const Navbar = () => {
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

          <Link to={RouteSignIn}>logIn</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
