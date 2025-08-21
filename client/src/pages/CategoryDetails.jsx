import {
  RouteAddCategory,
  RouteEditCategory,
} from "@/components/Helpers/RouteNames";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "@/components/Helpers/getenv";
import Loading from "@/components/Loading";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteData } from "@/components/Helpers/handleDelete";
import { showToast } from "@/components/Helpers/showToast";
import { useState } from "react";

const CategoryDetails = () => {
  const [refreshData, setRefreshData] = useState(false);
  const {
    data: CategoryData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-categories`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const hanldeDelete = (id) => {
    const response = deleteData(
      `${getEnv("VITE_API_BASE_URL")}/category/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data Deleted");
    } else {
      showToast("error", "Data not Deleted");
    }
  };
  if (loading) return <Loading />;
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button>
              <Link to={RouteAddCategory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of All Category</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CategoryData && CategoryData.categories.length > 0 ? (
                CategoryData.categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className=" flex gap-2 ">
                      <Button
                        variant="outline"
                        className="hover:text-[#8b5cf6]"
                      >
                        <Link to={RouteEditCategory(category._id)}>
                          <FaEdit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => {
                          hanldeDelete(category._id);
                        }}
                        variant="outline"
                        className="hover:text-white hover:bg-[#810000]"
                      >
                        <MdDelete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">
                    <div>Data Not Found</div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
