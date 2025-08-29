import HomeContent from "../components/HomeContent";
import { getEnv } from "@/components/Helpers/getenv";
import { useFetch } from "@/hooks/UseFetch";
import ProductCard from "../components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const {
    data: productData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/product/get-all-product-home`, {
    method: "get",
    credentials: "include",
  });

  return (
    <div>
      <HomeContent />

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 md:gap-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))
        ) : productData && productData.product.length > 0 ? (
          productData.product.map((product) => (
            <ProductCard props={product} key={product._id} />
          ))
        ) : (
          <div>Products related data not found</div>
        )}
      </div>
    </div>
  );
};

export default Home;
