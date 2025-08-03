import AppSidebar from "@/components/app-sidebar";
import Footer from "@/components/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar";

const Layout = () => {
  return (
    <>
      <SidebarProvider>
        <Navbar />
        <AppSidebar />
        <main className="w-auto">
          <div className=" h-auto min-h-[calc(100dvh-55px)] pb-32 pt-5 ">
            <Outlet />
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
};

export default Layout;
