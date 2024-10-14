import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Import the arrow icons

export default function NewsCard() {
  const [newsArticles, setNewsArticles] = useState<any>([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=finance&apiKey=f7c7f61e8c7b48c286946758ab9f50fb`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNewsArticles(data.articles);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchNews();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsArticles.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newsArticles.length - 1 : prevIndex - 1
    );
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (newsArticles.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md shadow-black shadow-md border-black w-1/3 flex flex-col items-center ml-5 min-h-[100px]">
      <div className="flex justify-between items-center w-full p-4">
        <button
          className="bg-gray-300 p-2 rounded hover:bg-gray-400"
          onClick={handlePrevious}
        >
          <ArrowLeft size={24} /> {/* Left arrow icon */}
        </button>
        <h2 className="font-bold text-lg text-center flex-1">
          {newsArticles[currentIndex].title}
        </h2>
        <button
          className="bg-gray-300 p-2 rounded hover:bg-gray-400"
          onClick={handleNext}
        >
          <ArrowRight size={24} /> {/* Right arrow icon */}
        </button>
      </div>
      <div className="flex flex-col items-center min-h-[20px] w-full mb-2">
        <a
          href={newsArticles[currentIndex].url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Read more
        </a>
      </div>
    </div>
  );
}
