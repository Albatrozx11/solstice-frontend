import { NextResponse } from "next/server";
const finnhub = require("finnhub");

export async function GET(req: Request){
    try {
      // Initialize the finnhub API client
      const api_key = finnhub.ApiClient.instance.authentications['api_key'];
      api_key.apiKey = 'crpe8j1r01qsek0fj8pgcrpe8j1r01qsek0fj8q0'; // Replace with your actual API key
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