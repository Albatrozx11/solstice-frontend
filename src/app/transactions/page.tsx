"use client";
import React, { useState, useEffect, useCallback } from "react";
import TransactionsNav from "@/components/structure/TransactionsNav";
import Stock from "@/components/ui/stock"; // Assuming this is a component to render stock information
import { useRouter } from "next/navigation";

// Helper component for transaction type indicator
const TransactionIndicator = ({ type }: { type: string }) => {
  const dotColor = type === "BUY" ? "bg-green-500" : "bg-red-500";
  return <span className={`h-3 w-3 rounded-full ${dotColor} mr-3`} />;
};

interface Transaction {
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

export default function Page() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/transactions/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data: Transaction[] = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col mx-10 h-max">
      <TransactionsNav />
      <h1 className="font-helvetica text-4xl md:text-6xl mb-6 mt-8">Transactions</h1>
      <div className="flex flex-col">
        {isLoading ? (
          <p>Loading...</p>
        ) : transactions.length > 0 ? (
          transactions.map((transaction: Transaction, index: number) => (
            <div
              key={index}
              className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 transition-colors"
            >
              
              <TransactionIndicator type={transaction.transction_type} />
              
              
              <Stock
                name={transaction.company.name}
                symbol={transaction.company.ticker}
              />
              
              
              <div className="ml-auto text-right">
                <p className="text-gray-700">
                  {transaction.transction_type === "BUY" ? "Bought" : "Sold"}{" "}
                  {transaction.quantity} @ ${parseFloat(transaction.price).toFixed(2)} 
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
}
