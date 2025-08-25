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
  RouteCategoryDetails,
  RouteIndex,
  RouteProduct,
} from "./Helpers/RouteNames";
import { Link } from "react-router-dom";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "@/components/Helpers/getenv";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { RiAlignItemBottomLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";

const AppSidebar = () => {
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
                  <Link href="#">
                    <span className="font-semibold text-[1rem] flex gap-1 items-center justify-center">
                      <BiUser className="font-extralight" />
                      Users
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <span className="font-semibold text-[1rem] flex gap-1 items-center justify-center">
                      <TbSettings />
                      Settings
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroupContent>
          <SidebarGroupLabel>List of category</SidebarGroupLabel>
          <SidebarMenu>
            {CategoryData &&
              CategoryData.categories.length > 0 &&
              CategoryData.categories.map((category) => {
                return (
                  <SidebarMenuItem key={category._id}>
                    <SidebarMenuButton asChild>
                      <Link href="#">
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
