"use client";
import React, { use } from "react";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import CompanyNav from "@/components/structure/CompanyNav";
import CompanyChart from "@/components/ui/CompanyChart";
import { Divide } from "lucide-react";
import { set } from "react-hook-form";
import { receiveMessageOnPort } from "worker_threads";
import { format } from "path";
const finnhub = require("finnhub");
interface CompanyProps {
  params: { id: string };
}
export default function page({ params }: CompanyProps) {
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [quote, setQuote] = useState<any>(null);
  const [recommendationData, setRecommendationData] = useState<any>(null);
  const [analystEstimates, setAnalystEstimates] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    qty: 0,
  });
  const [selected, setSelected] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const { id } = params;

  const handleSelectBuy = () => {
    setSelected("BUY");
  };
  const handleSelectSell = () => {
    setSelected("SELL");
  };

  const handleChange = (event: any) => {
    setFormData((prevFormData: any) => {
      const { name, value } = event.target;
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/finnhub/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch company data");
        }
        const data = await res.json();
        setCompanyProfile(data.companyProfile);
        setQuote(data.quote);
        console.log(data);
        const recommendationRes = await fetch(`/api/recommendation/${id}`);
        if (!recommendationRes.ok) {
          throw new Error("Failed to fetch company data");
        }
        const recommendationData = await recommendationRes.json();
        setRecommendationData(recommendationData);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchData();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  useEffect(() => {
    const calculateRecommendationPercentages = (data: any) => {
      let totalBuy = 0;
      let totalSell = 0;
      let totalHold = 0;
      let totalStrongBuy = 0;
      let totalStrongSell = 0;

      // Aggregate values from the data
      data.forEach((item: any) => {
        totalBuy += item.buy;
        totalSell += item.sell;
        totalHold += item.hold;
        totalStrongBuy += item.strongBuy;
        totalStrongSell += item.strongSell;
      });

      // Total recommendations
      const totalRecommendations =
        totalBuy + totalSell + totalHold + totalStrongBuy + totalStrongSell;

      // Calculate percentages
      const buyPercentage =
        totalRecommendations > 0
          ? ((totalBuy + totalStrongBuy) / totalRecommendations) * 100
          : 0;
      const sellPercentage =
        totalRecommendations > 0
          ? ((totalSell + totalStrongSell) / totalRecommendations) * 100
          : 0;
      const holdPercentage =
        totalRecommendations > 0 ? (totalHold / totalRecommendations) * 100 : 0;

      return {
        buyPercentage: buyPercentage.toFixed(0),
        sellPercentage: sellPercentage.toFixed(0),
        holdPercentage: holdPercentage.toFixed(0),
      };
    };


    if (recommendationData !== null) {
      const estimates = calculateRecommendationPercentages(recommendationData);
      setAnalystEstimates(estimates);
    }
  }, [recommendationData]);


    const formattedMarketCap = quote ? quote.marketCap.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }) : null;


  return (
    <div className="flex flex-col mx-10 h-max">
      <CompanyNav />
      <div className="flex h-max m-10">
        <div className="basis-[60%] flex justify-between">
          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <div className="flex flex-col w-full ml-5">
                {companyProfile && (
                  <>
                    <img src={companyProfile.logo} width={100} height={100} />
                    <h1 className="font-barlow text-2xl mt-2">
                      {companyProfile.name}
                    </h1>
                  </>
                )}
                {quote && (
                  <h1 className="font-barlow text-2xl mt-4">
                    ${quote.regularMarketPrice}
                  </h1>
                )}
              </div>
              <button className="rounded-md border-gray border-2 h-10 font-barlow px-2 mt-2 ">
                Watchlist
              </button>
            </div>
            <div className="mt-4 ml-4 ">
              <CompanyChart symbol={params.id}/>
            </div>
            {analystEstimates && (
              <div className="mt-20 ml-4 flex flex-col">
                <h1 className="text-2xl text-gray-600 mb-5">
                  Analyst Estimates
                </h1>
                <div className="flex ">
                  <div
                    className={`rounded-full p-8 w-max flex justify-center items-center ${
                      analystEstimates.buyPercentage >
                      analystEstimates.sellPercentage
                        ? `bg-green-500`
                        : `bg-red-600`
                    }  `}
                  >
                    <h1 className="font-helvetica text-white text-xl text-center">
                      {analystEstimates.buyPercentage >
                      analystEstimates.sellPercentage
                        ? analystEstimates.buyPercentage + `%`
                        : analystEstimates.sellPercentage + `%`}
                    </h1>
                  </div>
                  <div className="flex flex-col ml-20">
                    <h1 className="font-barlow text-gray-600 text-xl mb-2">
                      Buy: {analystEstimates.buyPercentage}
                    </h1>
                    <h1 className="font-barlow text-gray-600 text-xl mb-2">
                      Sell: {analystEstimates.sellPercentage}
                    </h1>
                    <h1 className="font-barlow text-gray-600 text-xl mb-2">
                      Hold: {analystEstimates.holdPercentage}
                    </h1>
                  </div>
                </div>
              </div>
            )}

            {quote && (
              <div className="mt-20 ml-4">
                <h1 className="text-2xl text-gray-600 mb-5">Fundamentals</h1>
                <div className="flex justify-between">
                  {/* Left Column */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between mb-4">
                      <h2 className="font-barlow text-xl text-gray-600">
                        Market Cap:
                      </h2>
                      <p className="font-barlow text-lg ml-10">
                        {formattedMarketCap}
                      </p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <h2 className="font-barlow text-xl text-gray-600">
                        P/E Ratio (TTM):
                      </h2>
                      <p className="font-barlow text-lg">{quote.trailingPE}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <h2 className="font-barlow text-xl text-gray-600">
                        P/B Ratio:
                      </h2>
                      <p className="font-barlow text-lg">{quote.priceToBook}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <h2 className="font-barlow text-xl text-gray-600">
                        Industry P/E:
                      </h2>
                      <p className="font-barlow text-lg">{quote.trailingPE}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <h2 className="font-barlow text-xl text-gray-600">
                        Debt to Equity:
                      </h2>
                      <p className="font-barlow text-lg">
                        {quote.debtToEquity}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between mb-4">
                      <h2 className="font-barlow text-xl text-gray-600">
                        ROE:
                      </h2>
                      <p className="font-barlow text-lg">
                        {quote.returnOnEquity}%
                      </p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <h2 className="font-barlow text-xl text-gray-600">
                        EPS (TTM):
                      </h2>
                      <p className="font-barlow text-lg">{quote.epsForward}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <h2 className="font-barlow text-xl text-gray-600">
                        Dividend Yield:
                      </h2>
                      <p className="font-barlow text-lg">
                        {quote.trailingAnnualDividendYield}%
                      </p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <h2 className="font-barlow text-xl text-gray-600">
                        Book Value:
                      </h2>
                      <p className="font-barlow text-lg">{quote.bookValue}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <h2 className="font-barlow text-xl text-gray-600">
                        Face Value:
                      </h2>
                      <p className="font-barlow text-lg">10</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="basis-[40%] ml-10 mt-2 border-2 border-gray-300 rounded-md h-full flex flex-col">
          <h1 className="text-xl font-barlow m-4">
            {companyProfile && companyProfile.name}
          </h1>
          <hr className="border-t-2 border-gray-400 w-full mt-auto" />
          <div className="flex">
            <button
              className={`mr-10 my-2 ml-4 text-xl ${
                selected == "BUY" ? `text-green-500` : `text-gray-600`
              }`}
              onClick={handleSelectBuy}
            >
              BUY
            </button>
            <button
              className={`mr-10 my-2 ml-4 text-xl ${
                selected == "SELL" ? `text-green-500` : `text-gray-600`
              }`}
              onClick={handleSelectSell}
            >
              SELL
            </button>
          </div>
          <hr className="border-t-2 border-gray-400 w-full mt-auto" />
          {selected == "BUY" ? (
            <>
              <div className="m-4 h-[300px]">
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between">
                    <label htmlFor="" className="font-barlow">
                      qty
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 rounded-md border-2 p-2"
                      onChange={handleChange}
                      name="qty"
                      value={formData.qty}
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <label htmlFor="" className="font-barlow">
                      Price
                    </label>
                    <input
                      type="none"
                      placeholder="At Market"
                      className="border-gray-300 rounded-md border-2 p-2"
                    />
                  </div>
                </form>
              </div>
              <div className="flex m-4 justify-between">
                <h1 className="text-gray-600 font-barlow">Balance: $0</h1>
                <h1 className="text-gray-600  font-barlow">
                  Approx req: $
                  {(formData.qty * quote.regularMarketPrice).toFixed(2)}
                </h1>
              </div>
              <hr className="border-t-2 border-gray-400 w-full mt-auto" />
              <button className="w-full bg-green-600 text-white font-barlow text-2xl rounded-md py-3">
                BUY
              </button>
            </>
          ) : (
            <div></div>
          )}
          {selected == "SELL" ? (
            <>
              <div className="m-4 h-[300px]">
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between">
                    <label htmlFor="" className="font-barlow">
                      qty
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 rounded-md border-2 p-2"
                      onChange={handleChange}
                      name="qty"
                      value={formData.qty}
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <label htmlFor="" className="font-barlow">
                      Price
                    </label>
                    <input
                      type="none"
                      placeholder="At Market"
                      className="border-gray-300 rounded-md border-2 p-2"
                    />
                  </div>
                </form>
              </div>
              <div className="flex m-4 justify-between">
                <h1 className="text-gray-600 font-barlow">Balance: $0</h1>
                <h1 className="text-gray-600  font-barlow">Approx req: $0</h1>
              </div>
              <hr className="border-t-2 border-gray-400 w-full mt-auto" />
              <button className="w-full bg-red-600 text-white font-barlow text-2xl rounded-md py-3">
                SELL
              </button>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
