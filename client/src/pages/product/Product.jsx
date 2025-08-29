import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  RouteAddProduct,
  RouteEditProduct,
} from "../../components/Helpers/RouteNames";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "@/components/Helpers/getenv";
import Loading from "@/components/Loading";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteData } from "@/components/Helpers/handleDelete";
import { showToast } from "@/components/Helpers/showToast";
import { useState } from "react";
import moment from "moment";
const Product = () => {
  const [refreshData, setRefreshData] = useState(false);
  const {
    data: productData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/product/get-all`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const hanldeDelete = (id) => {
    const response = deleteData(
      `${getEnv("VITE_API_BASE_URL")}/product/delete/${id}`
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
            <Link to={RouteAddProduct}>
              <Button className="cursor-pointer">Add Product</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of All Products</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Listing Date</TableHead>

                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productData && productData.product?.length > 0 ? (
                productData.product.map((product) => (
                  <TableRow key={product?._id}>
                    <TableCell>{product?.name ?? "N/A"}</TableCell>
                    <TableCell>{product?.category?.name ?? "N/A"}</TableCell>
                    <TableCell>{product?.stock ?? 0} </TableCell>
                    <TableCell>{product?.price ?? "0.00"}</TableCell>
                    <TableCell>
                      {product?.createdAt
                        ? moment(product.createdAt).format("DD-MM-YYYY")
                        : "N/A"}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        className="hover:bg-[#8b5cf6] hover:text-white"
                      >
                        <Link to={RouteEditProduct(product._id)}>
                          <FaEdit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => hanldeDelete(product._id)}
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
                  <TableCell colSpan="6">
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

export default Product;
