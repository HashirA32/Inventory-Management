import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  RouteCartHistory,
  RouteCategoryDetails,
  RouteIndex,
  RouteProduct,
  RouteProductByCategory,
  RouteUser,
} from "./Helpers/RouteNames";
import { Link } from "react-router-dom";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "@/components/Helpers/getenv";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { RiAlignItemBottomLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";

import { useSelector } from "react-redux";
import { BsCartCheck } from "react-icons/bs";

const AppSidebar = () => {
  const user = useSelector((state) => state.user);
  const { data: CategoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-categories`,
    {
      method: "get",
      credentials: "include",
    }
  );

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-[5rem]"></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={RouteIndex}>
                    <span className="font-semibold text-[1rem] flex gap-1 items-center justify-center">
                      <IoHome />
                      Home
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {user && user.isLoggedIn ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={RouteCartHistory(user.user._id)}>
                        <BsCartCheck className="text-9xl font-bold " /> Cart
                        History
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <></>
              )}
              {user.user.role === "admin" ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={RouteProduct}>
                        <span className="font-semibold text-[1rem] flex gap-1 items-center justify-center">
                          <RiAlignItemBottomLine />
                          Products
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={RouteCategoryDetails}>
                        <span className="font-semibold text-[1rem] flex gap-1 items-center justify-center">
                          <BiSolidCategoryAlt /> Categories
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={RouteUser}>
                        <span className="font-semibold text-[1rem] flex gap-1 items-center justify-center">
                          <BiUser className="font-extralight" />
                          Users
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <></>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroupContent>
          <hr />
          <SidebarGroupLabel>List of category</SidebarGroupLabel>
          <SidebarMenu>
            {CategoryData &&
              CategoryData.categories.length > 0 &&
              CategoryData.categories.map((category) => {
                return (
                  <SidebarMenuItem key={category._id}>
                    <SidebarMenuButton asChild>
                      <Link to={RouteProductByCategory(category.slug)}>
                        <span className="flex gap-1 items-center justify-center">
                          <BiSolidCategoryAlt />

                          {category.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
