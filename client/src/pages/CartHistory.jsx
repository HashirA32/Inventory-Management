import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "@/components/Helpers/getenv";
import Loading from "@/components/Loading";
import { Button } from "../components/ui/button";
import { decodeXML } from "entities";

export default function CartHistory() {
  const { userId } = useParams();

  const {
    data: historyData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/cart/history/${userId}`,
    { method: "get", credentials: "include" },
    []
  );

  // ✅ helper to download blob
  const downloadFile = (blob, fileName) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDownload = async () => {
    try {
      const url = `${getEnv("VITE_API_BASE_URL")}/cart/history/${userId}/pdf`;
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to download PDF");

      const blob = await res.blob();
      downloadFile(blob, "cart-history.pdf");
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  if (!historyData?.history?.length)
    return <p className="p-6">No cart history found.</p>;

  const allItems = historyData.history.flatMap((cart) => cart.items);
  const subtotal = allItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Cart History</h2>

        <Button
          variant="outline"
          className="w-full py-2 rounded"
          onClick={handleDownload}
        >
          Download PDF
        </Button>

        <div className="grid grid-cols-12 font-bold items-center border-b pb-2 gap-4">
          <div className="col-span-8">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-right">Total Price</div>
        </div>

        {historyData.history.map((cart, idx) => (
          <div key={idx} className="space-y-6">
            {cart.items.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-12 items-center border-b pb-6 gap-4"
              >
                <div className="col-span-2">
                  <img
                    src={item.productId?.featureImage || item.image}
                    alt={item.productId?.name || item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>

                <div className="col-span-6">
                  <h3 className="font-semibold text-2xl">
                    {item.productId?.name || item.name}
                  </h3>
                  {item.productId?.content && (
                    <p className="text-sm text-gray-500">
                      {decodeXML(item.productId?.content)
                        .split(" ")
                        .slice(0, 15)
                        .join(" ")}
                      ...
                    </p>
                  )}
                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                </div>

                <div className="col-span-2 text-center">
                  <p className="font-semibold">Rs. {item.price}</p>
                </div>

                <div className="col-span-2 text-right font-semibold">
                  Rs. {item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="border p-6 rounded space-y-4 h-fit">
        <h3 className="text-xl font-semibold">Summary</h3>

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>Rs. {subtotal}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>TBD</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Sales Tax</span>
          <span>TBD</span>
        </div>

        <hr />

        <div className="flex justify-between font-semibold text-lg">
          <span>Estimated Total</span>
          <span>Rs. {subtotal}</span>
        </div>
      </div>
    </div>
  );
}
