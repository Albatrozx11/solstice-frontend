"use client";
import React, { use } from "react";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import CompanyNav from "@/components/structure/CompanyNav";
import CompanyChart from "@/components/ui/CompanyChart";
import { Divide } from "lucide-react";
const finnhub = require("finnhub");
interface CompanyProps {
  params: { id: string };
}
export default function page({ params }: CompanyProps) {
  const [companyData, setCompanyData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    qty:0
  });
  const [selected, setSelected] = useState<any>(null);
  const [quote, setQuote] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const { id } = params;

  const handleSelectBuy = () => {
    setSelected("BUY");
  };
  const handleSelectSell = () => {
    setSelected("SELL");
  };

  const handleChange = () => {

  }

  const handleSubmit = () => {};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/finnhub/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch company data");
        }
        const data = await res.json();
        console.log(data);
        setCompanyData(data.companyProfile);
        setQuote(data.quote);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchData();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!companyData) {
    return (
      <div className=" text-3xl font-barlow flex text-center justify-center">
        Loading...
      </div>
    ); // Show a loading state while data is being fetched
  }
  return (
    <div className="flex flex-col mx-10 h-max">
      <CompanyNav />
      <div className="flex h-max m-10">
        <div className="basis-[60%] flex justify-between">
          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <div className="flex flex-col w-full">
                <img
                  src={`https://assets.parqet.com/logos/symbol/${companyData.ticker}?format=jpg`}
                  width={100}
                  height={100}
                />
                <h1 className="font-barlow text-2xl ml-5">
                  {companyData.name}
                </h1>
                <h1 className="font-barlow text-2xl ml-5 mt-4">${quote.pc}</h1>
              </div>
              <button className="rounded-md border-gray border-2 h-10 font-barlow px-2 mt-2 ">
                Watchlist
              </button>
            </div>
            <div className="mt-4 ml-4">
              <CompanyChart />
            </div>
          </div>
        </div>
        <div className="basis-[40%] ml-10 mt-2 border-2 border-gray-300 rounded-md h-full flex flex-col">
          <h1 className="text-xl font-barlow m-4">{companyData.name}</h1>
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
                <h1 className="text-gray-600  font-barlow">Approx req: ${}</h1>
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
                      Qty
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 rounded-md border-2 p-2"
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
