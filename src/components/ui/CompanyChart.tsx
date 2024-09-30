"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define an interface for the chart data
interface ChartData {
  date: string;
  close: number; // Assuming 'close' is a number
}

export const description = "A line chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function CompanyChart({ symbol }: { symbol: string }) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [filteredData, setFilteredData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [timeRange, setTimeRange] = useState("1year"); // default to 1-year data
  const [tooltipVisible, setTooltipVisible] = useState(false); // State to control tooltip visibility

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(`/api/chart/${symbol}`);
        const data = await response.json();

        // Format the data as needed for Recharts
        const formattedData: ChartData[] = data.oneYearData.quotes.map(
          (quote: any) => ({
            date: new Date(quote.date).toLocaleDateString(),
            close: quote.close, // Assuming 'close' is the value you want to plot
          })
        );

        setChartData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setError("Failed to fetch chart data.");
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol]);

  // Filter the data based on the selected time range
  useEffect(() => {
    let filtered = chartData;
    const totalDays = chartData.length;

    if (timeRange === "1month") {
      filtered = chartData.slice(Math.max(totalDays - 30, 0)); // Last 30 days
    } else if (timeRange === "5months") {
      filtered = chartData.slice(Math.max(totalDays - 150, 0)); // Last 150 days
    } else if (timeRange === "1year") {
      filtered = chartData; // All data (1 year)
    }

    setFilteredData(filtered);
  }, [timeRange, chartData]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;

  // Determine color based on growth or dip
  const isGrowing =
    filteredData.length > 0 &&
    filteredData[filteredData.length - 1].close > filteredData[0].close;
  const lineColor = isGrowing ? "green" : "red"; // Set color based on growth/dip

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
            className="top-28" // Keep the top-28 class to center the chart
            onMouseLeave={() => setTooltipVisible(false)} // Hide tooltip on mouse leave
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              hide={true} // Hide the x-axis labels
              tickFormatter={(value) => value.slice(0, 5)} // Display short date format
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              active={tooltipVisible} // Control tooltip visibility
            />
            <Line
              dataKey="close"
              type="natural"
              stroke={lineColor} // Use the calculated color
              strokeWidth={2}
              dot={false}
              onMouseEnter={() => setTooltipVisible(true)} // Show tooltip on line hover
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="space-x-4 z-20 relative"> {/* Ensure relative positioning */}
        {/* Buttons for selecting time ranges */}
        <button
          onClick={() => setTimeRange("1month")}
          className={`px-4 py-2 border rounded ${
            timeRange === "1month" ? "bg-gray-200" : "bg-white"
          }`}
        >
          1 Month
        </button>
        <button
          onClick={() => setTimeRange("5months")}
          className={`px-4 py-2 border rounded ${
            timeRange === "5months" ? "bg-gray-200" : "bg-white"
          }`}
        >
          5 Months
        </button>
        <button
          onClick={() => setTimeRange("1year")}
          className={`px-4 py-2 border rounded ${
            timeRange === "1year" ? "bg-gray-200" : "bg-white"
          }`}
        >
          1 Year
        </button>
      </CardFooter>
    </Card>
  );
}
