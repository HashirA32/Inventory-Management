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
import moment from "moment";
import usericon from "@/assets/images/user.png";
const User = () => {
  const [refreshData, setRefreshData] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-all-user`,
    {
      method: "GET",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = (id) => {
    const response = deleteData(
      `${getEnv("VITE_API_BASE_URL")}/user/delete/${id}`
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
        <CardContent>
          <Table>
            <TableCaption>A list of All Users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.user.length > 0 ? (
                data.user.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user?.role}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>
                      <img
                        className="h-[50px] w-[50px] rounded-full"
                        src={user.avatar || usericon}
                        alt="User Image"
                      />
                    </TableCell>

                    <TableCell>
                      {moment(user?.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className=" flex gap-2 ">
                      <Button
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                        variant="outline"
                        className="hover:bg-orange-500 hover:text-white"
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

export default User;
