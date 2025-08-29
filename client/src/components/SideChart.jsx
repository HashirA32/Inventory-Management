"use client";

import { TrendingUp } from "lucide-react";
import { Cell, LabelList, Pie, PieChart } from "recharts";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "@/components/Helpers/getenv";
import { showToast } from "@/components/Helpers/ShowToast";

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
  totalSold: {
    label: "Quantity Sold",
  },
};

export function SideChart() {
  const {
    data: weeklyData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/stats/top-products-weekly`, {
    method: "get",
    credentials: "include",
  });
  console.log(weeklyData);
  if (error) {
    showToast(error, "Failed to fetch weekly top products");
  }

  const colors = ["#6366f1", "#10b981", "#f59e0b"];

  const chartData =
    weeklyData?.map((p, idx) => ({
      name: p.name,
      totalSold: p.totalSold,
      fill: colors[idx] || colors[colors.length - 1],
    })) || [];

  return (
    <Card className="flex flex-row h-40 w-100 md:w-145 p-2">
      <CardHeader className="items-center justify-center p-0 w-14 md:w-40 text-[12px] md:text-2xl ">
        <CardTitle>Top 3 Weekly Products</CardTitle>
        <CardDescription>Based on quantity sold in last 7 days</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0 w-36 h-[200px] relative">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background text-[0.2rem] mx-auto  aspect-square absolute  bottom-7  h-[200px] max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="totalSold" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="totalSold"
              nameKey="name"
              className="text-[0.2rem]"
            >
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
        <span className="flex items-center gap-2 leading-none font-semibold md:text-[1rem]">
          Trending up this week
          <TrendingUp className="h-4 w-8" />
        </span>
        <div className="text-muted-foreground leading-none">
          Showing top 3 products sold in last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
