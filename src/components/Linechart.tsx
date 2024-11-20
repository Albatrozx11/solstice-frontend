"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive line chart";
interface ChartData {
  date: string;
  value: number;
}

const chartConfig = {
  views: {
    label: "total value :",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Linechart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");
  const [token, setToken] = useState("");
  const [isPortfolio, setIsPortfolio] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  useEffect(() => {
    const storedToken = localStorage.getItem("portfolio");
    if (storedToken === "created") {
      setIsPortfolio(true);
    }
  }, []);

  useEffect(() => {
    const storedTokenAuth = localStorage.getItem("token");
    if (storedTokenAuth) {
      setToken(storedTokenAuth);
    }
  }, []);
  useEffect(() => {
    const fetchPortfolioPerformance = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/user-portfolioPerformace/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Format the date and parse value as a number
          const formattedData = data.map((item: any) => ({
            date: new Date(item.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            value: parseFloat(item.value), // Ensure value is a number
          }));
          setChartData(formattedData); // Set the fetched data to state // Set the fetched data to state
          console.log(formattedData);
        }
      } catch (error) {
        console.error("Error fetching portfolio performance:", error);
      }
    };

    if (token) {
      fetchPortfolioPerformance();
    } else {
      console.log("Token not found");
    }
  }, [token]);

  const isGrowing =
    chartData.length > 0 &&
    chartData[chartData.length - 1].value >= chartData[0].value;
  const lineColor = isGrowing ? "green" : "red";
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row ">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <div className=""></div>
        </div>
        <div className="flex"></div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[190px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            className="top-10"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="value"
              type="monotone"
              stroke="#009D10"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
