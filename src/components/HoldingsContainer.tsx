import React from "react";
import Holdings from "./Holdings";
export default function HoldingsContainer() {
  return (
    <div className="rounded-md shadow-black shadow-md border-black w-[500px] ml-7 justify-start min-h-[65px]">
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
    </div>
  );
}
