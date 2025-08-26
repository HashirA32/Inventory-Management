"use client";

import { TrendingUp } from "lucide-react";
import { Cell, LabelList, Pie, PieChart } from "recharts";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "@/components/Helpers/getenv";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  stock: {
    label: "Stock",
  },
};

export function SideChart() {
  const {
    data: productData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/product/get-all`, {
    method: "get",
    credentials: "include",
  });

  const colors = ["#6366f1", "#10b981", "#f59e0b"];

  let chartData =
    productData?.product?.map((p, idx) => ({
      name: p.name,
      stock: Number(p.stock) || 0,
      fill: colors[idx] || colors[colors.length - 1],
    })) || [];

  chartData = chartData.sort((a, b) => b.stock - a.stock).slice(0, 3);

  return (
    <Card className="flex flex-row h-40 w-100 md:w-130 p-2">
      <CardHeader className="items-center justify-center p-0 w-14 md:w-30 text-[12px] md:text-2xl ">
        <CardTitle>Top 3 Products</CardTitle>
        <CardDescription>Based on highest stock</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0 w-36">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto pb-4 aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="stock" hideLabel />}
            />
            <Pie data={chartData} dataKey="stock" nameKey="name">
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
              {chartData.map((entry, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={colors[idx] || colors[colors.length - 1]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col p-0 py-6 gap-4 md:w-40 w-35 items-center justify-between text-sm">
        <div className="flex items-center gap-2 leading-none font-semibold md:text-[1rem]">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-8" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing top 3 products with highest stock
        </div>
      </CardFooter>
    </Card>
  );
}
