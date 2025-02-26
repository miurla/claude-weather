"use client";

import React, { useState } from "react";
import { Cloud, CloudRain, Sun, Snowflake, Wind } from "lucide-react";

// Define the type of props for WeatherCard
interface WeatherCardProps {
  weatherData: {
    location: string;
    temperature: number; // temperature in Celsius
    condition: string;
    humidity: number;
    windSpeed: number;
    high: number; // temperature in Celsius
    low: number; // temperature in Celsius
  };
  changeWeather: () => void;
}

const WeatherCard = ({ weatherData, changeWeather }: WeatherCardProps) => {
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  // Convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius: number): number => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  // Get temperature based on current unit
  const getTemperature = (celsius: number): number => {
    return isFahrenheit ? celsiusToFahrenheit(celsius) : Math.round(celsius);
  };

  // Function to determine background gradient based on condition
  const getBackgroundClass = (condition: string): string => {
    switch (condition.toLowerCase()) {
      case "rainy":
        return "bg-gradient-to-br from-blue-900 to-blue-700";
      case "cloudy":
        return "bg-gradient-to-br from-gray-700 to-gray-500";
      case "snowy":
        return "bg-gradient-to-br from-indigo-500 to-blue-300";
      case "windy":
        return "bg-gradient-to-br from-gray-800 to-gray-600";
      case "sunny":
      default:
        return "bg-gradient-to-br from-blue-400 to-blue-600";
    }
  };

  // Function to determine which weather icon to display
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "rainy":
        return <CloudRain className="h-16 w-16 text-white" />;
      case "cloudy":
        return <Cloud className="h-16 w-16 text-white" />;
      case "snowy":
        return <Snowflake className="h-16 w-16 text-white" />;
      case "windy":
        return <Wind className="h-16 w-16 text-white" />;
      case "sunny":
      default:
        return <Sun className="h-16 w-16 text-yellow-300" />;
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div
        className={`${getBackgroundClass(
          weatherData.condition
        )} rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm text-white mb-4`}
      >
        {/* Top section with location */}
        <div className="pt-6 px-6 pb-2">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{weatherData.location}</h2>
            <span className="text-sm opacity-80">Today</span>
          </div>
        </div>

        {/* Main weather display */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="text-6xl font-bold">
                  {getTemperature(weatherData.temperature)}°
                </div>
                <div className="capitalize text-lg mt-1 opacity-90">
                  {weatherData.condition}
                </div>
              </div>
            </div>
            {getWeatherIcon(weatherData.condition)}
          </div>
        </div>

        {/* High/Low temperature bar */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="whitespace-nowrap">
              L: {getTemperature(weatherData.low)}°
            </span>
            <div className="w-full mx-2 bg-white bg-opacity-30 rounded-full h-1.5">
              <div
                className="bg-white h-1.5 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(
                      0,
                      Math.round(
                        ((weatherData.temperature - weatherData.low) /
                          (weatherData.high - weatherData.low)) *
                          100
                      )
                    )
                  )}%`,
                }}
              ></div>
            </div>
            <span className="whitespace-nowrap">
              H: {getTemperature(weatherData.high)}°
            </span>
          </div>
        </div>

        {/* Weather details */}
        <div className="bg-black bg-opacity-20 backdrop-blur-sm px-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm opacity-75">Humidity</div>
              <div className="font-medium text-lg">{weatherData.humidity}%</div>
            </div>
            <div>
              <div className="text-sm opacity-75">Wind</div>
              <div className="font-medium text-lg">
                {weatherData.windSpeed} mph
              </div>
            </div>
          </div>
        </div>

        {/* Button area */}
        <div className="p-4 backdrop-blur-sm bg-white bg-opacity-10">
          <button
            onClick={changeWeather}
            className="bg-white text-blue-600 py-3 px-4 rounded-xl w-full font-medium transition-all duration-300 hover:bg-opacity-90"
          >
            Change Weather
          </button>
        </div>
      </div>
      <div className="h-10 flex items-center justify-center">
        <button
          onClick={() => setIsFahrenheit(false)}
          className={`h-8 px-4 rounded-l-lg transition-all font-medium ${
            !isFahrenheit
              ? "bg-neutral-200 text-black shadow-lg"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          °C
        </button>
        <button
          onClick={() => setIsFahrenheit(true)}
          className={`h-8 px-4 rounded-r-lg transition-all font-medium ${
            isFahrenheit
              ? "bg-neutral-200 text-black shadow-lg"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;
