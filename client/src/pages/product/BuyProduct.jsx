import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "@/components/Helpers/getenv";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Loading from "@/components/Loading";
import { Button } from "../../components/ui/button";
import { useSelector } from "react-redux";
import { showToast } from "../../components/Helpers/ShowToast";
import { RouteIndex } from "../../components/Helpers/RouteNames";

export default function BuyProduct() {
  const { slug } = useParams();
  const user = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const {
    data: productData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/product/get-product/${slug}`,
    {
      method: "get",
      credentials: "include",
    },
    [setQuantity]
  );

  const handleAddToCart = async () => {
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: user.user._id,
          productId: productData.product._id,
          name: productData.product.name,
          price: productData.product.price,
          image: productData.product.featureImage,
          quantity: Number(quantity),
        }),
      });

      const result = await res.json();
      if (!user.user._id) {
        showToast("error", "First LogIn to confirm perchase.");
        return <p>First LogIn to confirm perchase.</p>;
      }
      navigate(RouteIndex);
      if (loading) return <Loading />;
      if (error) {
        showToast("error", "Failed to fetch product details");
        return <p>{error.message}</p>;
      }
      if (!productData) {
        showToast("error", "Product not found");
        return <p>No product found</p>;
      }
      if (!res.ok) {
        showToast("error", result.message || "Failed to add product to cart");
        return;
      }

      showToast(
        "success",
        result.message || "Product added to cart successfully"
      );
    } catch (err) {
      showToast("error", err.message || "Something went wrong");
    }
  };

  return (
    <Card className="max-w-lg mx-auto p-6 shadow rounded">
      <CardContent>
        <img
          src={productData?.product.featureImage}
          alt={productData?.product.name}
          className="w-full h-64 object-cover rounded"
        />
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold mt-4">
            {productData?.product.name}
          </h2>
          <h3>Available Stock: {productData?.product.stock}</h3>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-semibold">
            Price: Rs. {productData?.product.price}
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={productData?.product.stock || 999}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-20 border rounded px-2 py-1 text-center"
            />
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="mt-6 w-full px-4 py-2 rounded cursor-pointer"
        >
          Confirm Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
