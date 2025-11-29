import { getEnv } from "@/components/Helpers/getenv";
import { useFetch } from "@/hooks/UseFetch";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const {
    data: productData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/product/search?q=${q}`,
    {
      method: "get",
      Credential: "include",
    },
    [searchParams]
  );
  console.log(productData);
  return (
    <>
      <div className="flex items-center gap-2 text-2xl font-bold border-b pb-2 mb-5 text-orange-400">
        Search Reasults for : {q}
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
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

export default SearchResult;
