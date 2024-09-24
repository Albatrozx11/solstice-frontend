import { NextResponse } from "next/server";
const finnhub = require("finnhub");

export async function GET(req: Request, { params }: { params: { symbol: string } }) {
    const { symbol } = params;
  
    try {
      // Initialize the finnhub API client
      const api_key = finnhub.ApiClient.instance.authentications['api_key'];
      api_key.apiKey = 'crpe8j1r01qsek0fj8pgcrpe8j1r01qsek0fj8q0'; // Replace with your actual API key
      const finnhubClient = new finnhub.DefaultApi();
  
      // Fetch the company profile data
      const companyProfile = await new Promise((resolve, reject) => {
        finnhubClient.companyProfile2({ symbol }, (error:any, data:any) => {
          if (error) reject(error);
          resolve(data);
        });
      });
      
      const quote = await new Promise((resolve, reject) => {
        finnhubClient.quote({symbol}, (error:any, data:any) => {
          if (error) reject(error);
          resolve(data);
        });
      });

      const recommendation = await new Promise((resolve, reject) => {
        finnhubClient.recommendationTrends({symbol}, (error:any, data:any) => {
          if (error) reject(error);
          console.log(data);
          resolve(data);
        });
      })

      return NextResponse.json({
        companyProfile,
        quote,
        recommendation
    });
    } catch (error) {
      console.error('Error fetching company data:', error);
      return NextResponse.json({ error: 'Failed to fetch company data' }, { status: 500 });
    }
  }