import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { AvatarImage } from "@radix-ui/react-avatar";
import { BsCalendar3 } from "react-icons/bs";
import { Link } from "react-router-dom";

import moment from "moment";
import { RouteBuyProduct, RouteProductDetails } from "./Helpers/RouteNames";

const ProductCard = ({ props }) => {
  return (
    <Card className="pt-5 h-70 w-80">
      <CardContent>
        <Link to={RouteProductDetails(props.category.slug, props.slug)}>
          <div className="w-full h-40 overflow-hidden rounded-2xl border relative">
            <div className="flex justify-around items-center gap-2 pb-1.5 absolute right-3 top-2">
              {props.stock > 0 ? (
                <Badge variant="outline" className="bg-[#8b5cf6] border-none">
                  Availble
                </Badge>
              ) : (
                <>
                  <Badge
                    variant="outline"
                    className="bg-red-600 p-1  border-none"
                  >
                    Out of stock
                  </Badge>
                </>
              )}
            </div>
            <img
              src={props.featureImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex justify-between h-8 items-center mt-3 text-[1.2rem]">
          <h2 className="font-4xl font-bold line-clamp-2">{props.name}</h2>
          <div className="flex justify-start items-center gap-1 text-[0.9rem]">
            <BsCalendar3 />:
            <span>{moment(props.createdAt).format("DD-MM-YYYY")}</span>
          </div>
        </div>

        <div className="flex flex-row justify-between items-end pt-3 ">
          <Link to={RouteBuyProduct(props.slug)}>
            <Button className="cursor-pointer">Add to Cart</Button>
          </Link>
          <h3 className="font-4xl">
            Rs: {props.price}{" "}
            <span className="font-extralight text-sm">only</span>
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
