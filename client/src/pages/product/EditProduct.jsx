import React, { useState } from "react";
("use client");

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect } from "react";
import slugify from "slugify";
import { showToast } from "@/components/Helpers/showToast";
import { getEnv } from "@/components/Helpers/getenv";
import { useSelector } from "react-redux";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteProduct } from "../../components/Helpers/RouteNames";
import Loading from "@/components/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/UseFetch";
import Dropzone from "react-dropzone";
import { Textarea } from "@/components/ui/textarea";
const EditProduct = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const { productid } = useParams();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 character long."),
    category: z.string().min(3, "Category must be at least 3 character long."),
    stock: z.preprocess(
      (val) => Number(val),
      z
        .number()
        .int("Stock must be an integer.")
        .nonnegative("Stock cannot be negative.")
        .refine((val) => !isNaN(val), {
          message: "Stock must be a valid number.",
        })
    ),
    price: z.preprocess(
      (val) => Number(val),
      z
        .number()
        .nonnegative("Price cannot be negative.")
        .refine((val) => !isNaN(val), {
          message: "Price must be a valid number.",
        })
    ),
    content: z.string().min(3, "Content must be at least 3 character long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      stock: "",
      price: "",
      content: "",
    },
  });

  const { data: CategoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-categories`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const { data: ProductData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/product/edit/${productid}`,
    {
      method: "get",
      credentials: "include",
    },
    [productid]
  );
  useEffect(() => {
    if (ProductData) {
      setPreview(ProductData.product.featureImage),
        form.reset({
          name: ProductData.product.name || "",
          category: ProductData.product.category?._id || "",
          stock: ProductData.product.stock || "",
          price: ProductData.product.price || "",
          content: ProductData.product.content || "",
        });
    }
  }, [ProductData, form]);

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/product/update/${productid}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      form.reset();
      setFile();
      setPreview();
      navigate(RouteProduct);

      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  if (loading) return <Loading />;
  return (
    <div className="">
      <Card className="p-5 max-w-screen-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-start gap-5">
            <div>
              <Button className="cursor-pointer">
                <Link to={RouteProduct}>
                  <MdKeyboardBackspace />
                </Link>
              </Button>
            </div>
            <div>Edit Product</div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValues={field.value}
                          className="w-full"
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CategoryData &&
                              CategoryData.categories.length > 0 &&
                              CategoryData.categories.map((category) => (
                                <SelectItem
                                  value={category._id}
                                  key={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter amount of product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter product price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-fit ">
                <span className="block my-2">Feature image</span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="w-36 h-32 flex items-center border-2 rounded-2xl cursor-pointer">
                        <img src={filePreview} alt="" />
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
                          className="resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProduct;
