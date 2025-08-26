"use client";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "@/components/Helpers/getenv";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import Loading from "@/components/Loading";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  stock: {
    label: "Stock",
    color: "var(--chart-1)",
  },
  price: {
    label: "Price",
    color: "var(--chart-2)",
  },
};

const MainChart = () => {
  const {
    data: productData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/product/get-all`, {
    method: "get",
    credentials: "include",
  });

  const chartData =
    productData?.product?.map((p) => ({
      name: p.name,
      stock: Number(p.stock) || 0,
      price: Number(p.price) || 0,
    })) || [];

  const maxStock = Math.max(...chartData.map((d) => d.stock), 0);
  const maxPrice = Math.max(...chartData.map((d) => d.price), 0);
  if (loading) return <Loading />;
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-65">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="fillStock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
          </linearGradient>

          <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />

        <YAxis domain={[0, Math.max(maxStock, maxPrice)]} />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => value}
              indicator="dot"
            />
          }
        />

        {/* Stock area */}
        <Area
          dataKey="stock"
          type="monotone"
          fill="url(#fillStock)"
          stroke="var(--chart-1)"
        />

        {/* Price area */}
        <Area
          dataKey="price"
          type="monotone"
          fill="url(#fillPrice)"
          stroke="var(--chart-2)"
        />

        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};

export default MainChart;
