import { getEnv } from "@/components/Helpers/getenv";
import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/UseFetch";
import { useParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import ProductCard from "../../components/ProductCard";

const ProductByCategory = () => {
  const { category } = useParams();
  const {
    data: productData,
    loading,
    error,
  } = useFetch(
    `${getEnv(
      "VITE_API_BASE_URL"
    )}/product/get-product-by-category/${category}`,
    {
      method: "get",
      Credential: "include",
    },
    [category]
  );

  if (loading) return <Loading />;
  return (
    <>
      <div className="flex items-center gap-2 text-2xl font-bold border-b pb-2 mb-5 text-orange-400">
        <BiCategory />
        {productData && productData.categoryData?.name}
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-10">
        {productData && productData.product.length > 0 ? (
          productData.product.map((product) => (
            <ProductCard key={product._id} props={product} />
          ))
        ) : (
          <div>products related data not found</div>
        )}
      </div>
    </>
  );
};

export default ProductByCategory;
