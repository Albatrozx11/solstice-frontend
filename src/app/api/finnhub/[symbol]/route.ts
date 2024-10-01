import { NextResponse } from "next/server";
const finnhub = require("finnhub");
import yahooFinance from "yahoo-finance2";
import dotenv from "dotenv";
export async function GET(
  req: Request,
  { params }: { params: { symbol: string } }
) {
  const { symbol } = params;
  dotenv.config();
  try {
    const today = new Date();

    // Format dates to 'YYYY-MM-DD'
    const formatDate = (date: any) => {
      return date.toISOString().split("T")[0]; // Extract the date part
    };
    // Initialize the finnhub API client
    const api_key = finnhub.ApiClient.instance.authentications["api_key"];
    api_key.apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY; // Replace with your actual API key
    const finnhubClient = new finnhub.DefaultApi();

    // Fetch the company profile data
    const companyProfile = await new Promise((resolve, reject) => {
      finnhubClient.companyProfile2({ symbol }, (error: any, data: any) => {
        if (error) reject(error);
        resolve(data);
      });
    });

    const quote = await yahooFinance.quote(symbol);

    const news = await new Promise((resolve, reject) => {
      finnhubClient.companyNews(
        symbol,
        formatDate(today),
        formatDate(today),
        (error: any, data: any) => {
          if (error) reject(error);
          resolve(data);
        }
      );
    });

    return NextResponse.json({
      companyProfile,
      quote,
      news,
    });
  } catch (error) {
    console.error("Error fetching company data:", error);
    return NextResponse.json(
      { error: "Failed to fetch company data" },
      { status: 500 }
    );
  }
}
