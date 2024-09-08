import React from "react";

export default function PriceIndex() {
  return (
    <div className="rounded-md  shadow-black shadow-md border-black  w-1/6 h-full flex ml-5">
      <div className="flex flex-col m-2">
        <h1 className="font-barlow text-2xl text-black px-4 pt-2 opacity-80">
          NASDAQ
        </h1>
        <div className="flex">
        <h1 className="font-barlow text-2xl px-4 pb-2 text-[#615D5D]">
          17,636.17
        </h1>
        <h1 className="font-barlow text-2xl px-4 pb-2 text-[#009D10]">
          +0.23%
        </h1>
        </div>
      </div>
    </div>
  );
}
