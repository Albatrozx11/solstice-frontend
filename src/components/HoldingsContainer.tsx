import React from "react";
import Holdings from "./Holdings";
import { useState,useEffect } from "react";
export default function HoldingsContainer() {
  const [isPortfolio, setIsPortfolio] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem("portfolio");
    if (storedToken == "created") {
      setIsPortfolio(true);
    }
  }, []);

  return (
    
    <div className={`rounded-md shadow-black shadow-md border-black basis-[34%] ml-7 ${isPortfolio ? `justify-start items-center` : `justify-center`}  min-h-[65px]`}>
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
            <Holdings />
            </>
      ) : (<h1 className="font-barlow text-xl text-black opacity-80 px-2 my-6 mx-4">Create a portfolio to view your holdings</h1>)}

    </div>
  );
}
