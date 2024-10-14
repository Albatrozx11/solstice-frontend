import { NextResponse } from "next/server";
const finnhub = require("finnhub");
import dotenv from "dotenv";

dotenv.config();

export async function GET(req: Request) {
  try {
    // Initialize the Finnhub API client
    const api_key = finnhub.ApiClient.instance.authentications["api_key"];
    api_key.apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY; // Ensure the API key is correct
    const finnhubClient = new finnhub.DefaultApi();

    // Get today's date and yesterday's date
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // Format dates to 'YYYY-MM-DD'
    const formatDate = (date: Date) => {
      return date.toISOString().split("T")[0]; // Extract the date part
    };

    // Fetch market news for yesterday
    const marketNews = await new Promise((resolve, reject) => {
      finnhubClient.marketNews(
        "general", // You can change this to other categories as needed
        formatDate(yesterday), // Start date
        formatDate(yesterday), // End date
        (error: any, data: any) => {
          if (error) {
            console.error("Error fetching market news:", error); // Log the error for debugging
            return reject(error); // Reject if an error occurs
          }
          resolve(data); // Resolve with the fetched data
        }
      );
    });

    // Return the market news data
    return NextResponse.json({ marketNews });
  } catch (error) {
    console.error("Error fetching market data:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
  }
}
