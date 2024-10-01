import { NextResponse } from "next/server";
const finnhub = require("finnhub");
import dotenv from "dotenv";
export async function GET(req: Request){
    dotenv.config();
    try {
      // Initialize the finnhub API client
      const api_key = finnhub.ApiClient.instance.authentications['api_key'];
      api_key.apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY; // Replace with your actual API key
      const finnhubClient = new finnhub.DefaultApi();
  

      //fetch stocks
        const stocks = await new Promise((resolve, reject) => {
            finnhubClient.stockSymbols("US", (error:any, data:any) => {
            if (error) reject(error);
            resolve(data);
            console.log(data);
            });
        });

        return NextResponse.json({
            stocks
        });

    } catch (error) {
      console.error('Error fetching company data:', error);
      return NextResponse.json({ error: 'Failed to fetch company data' }, { status: 500 });
    }
} 