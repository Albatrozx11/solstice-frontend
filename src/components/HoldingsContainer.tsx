import React, { useEffect, useState } from "react";
import Holdings from "./Holdings"; // Import the updated component

interface HoldingData {
  portfolio: {
    user: number;
    portfolio_name: string;
  };
  company: {
    name: string;
    ticker: string;
  };
  transction_type: string;
  quantity: number;
  price: string;
  date: string;
}

export default function HoldingsContainer({setHoldingsData}:any) {
  const [isPortfolio, setIsPortfolio] = useState(false);
  const [token, setToken] = useState("");
  const [holdings, setHoldings] = useState<HoldingData[]>([]);

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
    const fetchHoldings = async () => {
      try {
        const response = await fetch("http://localhost:8000/transactions/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setHoldings(data); // Set the fetched data to state
          setHoldingsData(data); // Set the fetched data to state
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching holdings:", error);
      }
    };

    if (token) {
      fetchHoldings();
    }
  }, [token]);

  const filteredHoldings = holdings.filter(
    (holding) => holding.transction_type === "BUY"
  );
  return (
    <div
      className={`rounded-md shadow-black shadow-md border-black basis-[34%] ml-7 ${
        isPortfolio ? `justify-start items-center` : `justify-center`
      }  min-h-[65px]`}
    >
      {isPortfolio ? (
        <>
          <div className="flex justify-between">
            <h1 className="font-barlow text-xl text-black opacity-80 px-2 my-6 mx-4 ">
              HOLDINGS
            </h1>
            <h1 className="font-barlow text-xl text-black opacity-80 px-2 my-6 mx-4">
              MKT PRICE
            </h1>
            <h1 className="font-barlow text-xl text-black opacity-80 px-2 my-6 mx-4">
              RETURNS
            </h1>
            <h1 className="font-barlow text-xl text-black opacity-80 px-2 my-6 mx-4">
              CURRENT
            </h1>
          </div>
          <hr className="border-t-2 border-gray-400 w-full mt-auto" />
          <div className="max-h-[400px] overflow-y-auto">
          {/* Map through holdings and render each holding */}
          {filteredHoldings.map((holding, index) => (
            <Holdings
              key={index}
              ticker={holding.company.ticker}
              quantity={holding.quantity}
              price={parseFloat(holding.price)} // Convert string price to number
              currentValue={parseFloat(holding.price) * holding.quantity} // Placeholder for the current value, can be calculated based on live data
            />
          ))}
          </div>
        </>
      ) : (
        <h1 className="font-barlow text-xl text-black opacity-80 px-2 my-6 mx-4">
          Create a portfolio to view your holdings
        </h1>
      )}
    </div>
  );
}
