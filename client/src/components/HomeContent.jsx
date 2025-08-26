import Loading from "@/components/Loading";
import MainChart from "./MainChart";
import { SideChart } from "./SideChart";
import { FaBoxes } from "react-icons/fa";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "@/components/Helpers/getenv";
const HomeContent = () => {
  const {
    data: productData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/product/get-all`, {
    method: "get",
    credentials: "include",
  });
  if (loading) return <Loading />;
  return (
    <>
      <div className="my-0 mx-5 w-full flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-20 ">
          <div className="border rounded-2xl w-90 h-40 p-5">
            <div className="font-bold text-2xl">Inventory Summary</div>
            <div className="flex p-3 m-2 gap-2 ">
              <div className="flex flex-col gap-1 p-1 items-center justify-center w-[50%]">
                <div>
                  <FaBoxes />
                </div>
                <div>
                  {productData && productData.product?.length > 0 ? (
                    (() => {
                      const totalStock = productData.product.reduce(
                        (acc, product) => acc + Number(product.stock || 0),
                        0
                      );

                      return <div>{totalStock}</div>;
                    })()
                  ) : (
                    <div>Data not found</div>
                  )}
                </div>
                <div className="text-[12px]">Product in Hand</div>
              </div>
              <div className="border-r-1 border-[#2123233d]"></div>
              <div className="flex flex-col gap-1 p-1 items-center justify-center ">
                <div>
                  <FaBoxes />
                </div>
                <div>546</div>
                <div className="text-[12px] w-32">Product to be dilivered</div>
              </div>
            </div>
          </div>
          <div>
            <SideChart />
          </div>
        </div>
        <div className="w-full px-10 my-5 ">
          <div className="font-bold text-2xl my-5">Price & Stock Overview</div>
          <MainChart />
        </div>
      </div>
    </>
  );
};

export default HomeContent;
