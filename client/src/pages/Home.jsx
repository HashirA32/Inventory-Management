"use client";
import { useEffect, useRef, useState } from "react";
import HomeContent from "../components/HomeContent";
import { getEnv } from "@/components/Helpers/getenv";
import ProductCard from "../components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);
  const fetchProducts = async (pageNum) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${getEnv(
          "VITE_API_BASE_URL"
        )}/product/get-all-product-home?page=${pageNum}&limit=15`,
        { credentials: "include" }
      );
      const data = await res.json();

      if (res.ok) {
        setProducts((prev) => {
          const merged = [...prev, ...data.products];
          return merged.filter(
            (p, index, self) => index === self.findIndex((x) => x._id === p._id)
          );
        });
        setTotalPages(data.pages);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && page < totalPages && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.8 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [page, totalPages, loading]);

  return (
    <div>
      <HomeContent />

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 md:gap-3">
        {products.length > 0
          ? products.map((product) => (
              <ProductCard props={product} key={product._id} />
            ))
          : !loading && <div>Products related data not found</div>}
      </div>

      <div ref={loaderRef} className="flex justify-center my-6">
        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-40 w-72 rounded-xl" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
