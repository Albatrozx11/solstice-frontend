import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(req: Request, { params }: { params: { symbol: string } }) {
  const { symbol } = params;

  try {
    const today = new Date();

    // Helper function to calculate date offsets in UNIX timestamp format (in seconds)
    const getDateOffset = (months: number) => {
      const offsetDate = new Date(today);
      offsetDate.setMonth(today.getMonth() - months);
      return Math.floor(offsetDate.getTime() / 1000); // Convert to UNIX timestamp (in seconds)
    };

    // Define query options for each interval with correct format
    const oneYearOptions = {
      period1: getDateOffset(12), // 1 year ago in UNIX timestamp
      period2: Math.floor(today.getTime() / 1000), // Today in UNIX timestamp
    };

    const oneMonthOptions = {
      period1: getDateOffset(1), // 1 month ago in UNIX timestamp
      period2: Math.floor(today.getTime() / 1000), // Today in UNIX timestamp
    };

    const fiveMonthOptions = {
      period1: getDateOffset(5), // 5 months ago in UNIX timestamp
      period2: Math.floor(today.getTime() / 1000), // Today in UNIX timestamp
    };

    // Fetch data for each interval
    const oneYearData = await yahooFinance.chart(symbol, oneYearOptions);
    const oneMonthData = await yahooFinance.chart(symbol, oneMonthOptions);
    const fiveMonthData = await yahooFinance.chart(symbol, fiveMonthOptions);

    // Return all data as a JSON response
    return NextResponse.json({
      oneYearData,
      oneMonthData,
      fiveMonthData,
    });
  } catch (error) {
    console.error("Error fetching company data:", error);
    return NextResponse.json({ error: "Failed to fetch company data" }, { status: 500 });
  }
}
