import { getEnv } from "@/components/Helpers/getenv";
import Loading from "@/components/Loading";
import { Avatar } from "@/components/ui/avatar";
import { useFetch } from "@/hooks/UseFetch";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useParams } from "react-router-dom";
import UserIcon from "@/assets/images/user.png";
import { marked } from "marked";
import { decodeXML } from "entities";
import moment from "moment";

const ProductDetails = () => {
  const { product, category } = useParams();
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/product/get-product/${product}`,
    {
      method: "get",
      Credential: "include",
    },
    [product, category]
  );

  let htmlContent = "";
  if (data && data.product && data.product.content) {
    const content = decodeXML(data.product.content);
    htmlContent = marked(content);
  }
  if (loading) return <Loading />;
  return (
    <>
      <div className="flex md:flex-nowrap flex-wrap gap-10 md:gap-3 w-full">
        {data && data.product && (
          <>
            <div className="border rounded md:w-[70%] w-full  p-5 ">
              <h1 className="text-2xl font-bold  text-[#8c5df6]">
                {data.product.name}
              </h1>
              <div className="flex w-full items-baseline justify-between px-2">
                <div className="flex w-full justify-between items-center font-semibold">
                  <div className="flex  justify-start w-full items-center gap-2 pt-2">
                    <p>Product of : {data.product.auther.name}</p>
                  </div>
                  <div className="text-xs flex items-center justify-center w-50">
                    Created At :{" "}
                    {moment(data.product.createdAt).format("DD-MM-YYYY")}
                  </div>
                </div>
              </div>
              <div className="py-5 w-full">
                <img
                  src={data.product.featureImage}
                  alt="FeaturedImage"
                  className="rounded w-[100%]"
                />
              </div>
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              ></div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
