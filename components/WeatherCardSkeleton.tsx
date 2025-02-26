"use client";

import React from "react";

// Skeleton loader component
const WeatherCardSkeleton = () => {
  return (
    <div className="w-[480px]">
      <div className="flex flex-col items-center p-6">
        <div className="bg-gradient-to-br from-gray-400 to-gray-300 rounded-3xl overflow-hidden shadow-lg w-full max-w-sm text-white animate-[pulse_2s_ease-in-out_infinite] mb-4">
          {/* Top section with location */}
          <div className="pt-6 px-6 pb-2">
            <div className="flex justify-between items-center">
              <div className="h-8 w-32 bg-gray-200 bg-opacity-20 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 bg-opacity-20 rounded"></div>
            </div>
          </div>

          {/* Main weather display */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <div className="h-16 w-24 bg-gray-200 bg-opacity-20 rounded mb-2"></div>
                  <div className="h-6 w-20 bg-gray-200 bg-opacity-20 rounded"></div>
                </div>
              </div>
              <div className="h-16 w-16 bg-gray-200 bg-opacity-20 rounded-full"></div>
            </div>
          </div>

          {/* High/Low temperature bar */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-10 bg-gray-200 bg-opacity-20 rounded"></div>
              <div className="w-full mx-2 bg-white bg-opacity-20 rounded-full h-1.5"></div>
              <div className="h-4 w-10 bg-gray-200 bg-opacity-20 rounded"></div>
            </div>
          </div>

          {/* Weather details */}
          <div className="bg-black bg-opacity-10 backdrop-blur-sm px-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="h-4 w-16 bg-gray-200 bg-opacity-20 rounded mb-2"></div>
                <div className="h-6 w-12 bg-gray-200 bg-opacity-20 rounded"></div>
              </div>
              <div>
                <div className="h-4 w-16 bg-gray-200 bg-opacity-20 rounded mb-2"></div>
                <div className="h-6 w-12 bg-gray-200 bg-opacity-20 rounded"></div>
              </div>
            </div>
          </div>

          {/* Button area */}
          <div className="p-4 backdrop-blur-sm bg-white bg-opacity-5">
            <div className="h-12 w-full bg-gray-200 bg-opacity-20 rounded-xl"></div>
          </div>
        </div>
        <div className="h-10 flex items-center justify-center">
          <div className="flex">
            <div className="h-8 w-12 bg-gray-200 rounded-l-lg"></div>
            <div className="h-8 w-12 bg-gray-200 rounded-r-lg"></div>
          </div>
        </div>

        {/* Assistant message skeleton */}
        <div className="h-[76px] mt-4 w-full invisible">
          <div className="p-4 bg-white rounded-xl shadow-sm animate-[pulse_2s_ease-in-out_infinite]">
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;
