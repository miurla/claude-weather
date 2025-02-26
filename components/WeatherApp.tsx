"use client";

import { useChat } from "@ai-sdk/react";
import { Search } from "lucide-react";
import WeatherCard from "./WeatherCard";
import WeatherCardSkeleton from "./WeatherCardSkeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Status = "streaming" | "submitted" | "ready" | "error";

interface WeatherDataType {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  high: number;
  low: number;
}

// Define the type for the tool result
interface WeatherToolResult {
  location?: string;
  current?: {
    temperature?: number;
    condition?: string;
    humidity?: number;
    windSpeed?: number;
  };
  forecast?: {
    high?: number;
    low?: number;
  };
  error?: string;
}

type WeatherToolInvocation = {
  type: "tool-invocation";
  toolInvocation: {
    toolName: "displayWeather";
    state: "result";
    result: WeatherToolResult;
  };
};

export default function WeatherApp() {
  const { messages, handleSubmit, setInput, input, append, status } = useChat();

  // Convert weather condition to WeatherCard format
  const mapConditionToType = (condition: string): string => {
    condition = condition.toLowerCase();
    if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("shower")
    ) {
      return "rainy";
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
      return "cloudy";
    } else if (
      condition.includes("snow") ||
      condition.includes("blizzard") ||
      condition.includes("ice")
    ) {
      return "snowy";
    } else if (condition.includes("wind") || condition.includes("gale")) {
      return "windy";
    } else {
      return "sunny";
    }
  };

  // Convert API response to WeatherDataType
  const formatWeatherData = (data: WeatherToolResult): WeatherDataType => {
    return {
      location: data.location || "",
      temperature: Math.round(data.current?.temperature || 0),
      condition: mapConditionToType(data.current?.condition || ""),
      humidity: data.current?.humidity || 0,
      windSpeed: Math.round(data.current?.windSpeed || 0),
      high: Math.round(data.forecast?.high || 0),
      low: Math.round(data.forecast?.low || 0),
    };
  };

  // Get the last message
  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1] : null;

  // Get weather data
  let weatherData: WeatherDataType | null = null;

  if (lastMessage) {
    const parts = lastMessage.parts as WeatherToolInvocation[] | undefined;
    const weatherPart = parts?.find(
      (part) =>
        part.type === "tool-invocation" &&
        part.toolInvocation.toolName === "displayWeather" &&
        part.toolInvocation.state === "result"
    );

    if (weatherPart?.toolInvocation.result) {
      try {
        weatherData = formatWeatherData(weatherPart.toolInvocation.result);
      } catch (error) {
        console.error("Error formatting weather data:", error);
      }
    }
  }

  // Change Weather button handler
  const handleChangeWeather = () => {
    const cities = [
      "New York",
      "Tokyo",
      "London",
      "Paris",
      "Sydney",
      "Cairo",
      "Beijing",
      "Seoul",
      "Bangkok",
      "Dubai",
      "Moscow",
      "Berlin",
      "Rome",
      "Barcelona",
      "Amsterdam",
      "Vienna",
      "Prague",
      "Budapest",
      "Warsaw",
      "Lisbon",
      "Zagreb",
      "Stockholm",
      "Oslo",
      "Helsinki",
      "Riga",
      "Tallinn",
      "Vilnius",
      "Warsaw",
      "Zagreb",
      "Stockholm",
      "Oslo",
      "Helsinki",
      "Riga",
      "Tallinn",
    ];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];

    append({
      role: "user",
      content: `Show me the weather in ${randomCity}.`,
    });
  };

  // Get the last message that's not a tool invocation
  const lastTextMessage = messages
    .slice()
    .reverse()
    .find(
      (message) =>
        message.role === "assistant" && typeof message.content === "string"
    );

  return (
    <main className="flex flex-col items-center min-h-screen">
      {weatherData || status === "streaming" || status === "submitted" ? (
        <>
          {/* Main content area */}
          <div className="flex-grow w-full overflow-y-auto pb-20">
            <div className="flex flex-col items-center justify-center pt-16">
              <div className="w-[480px]">
                {weatherData ? (
                  <>
                    <WeatherCard
                      weatherData={weatherData}
                      changeWeather={handleChangeWeather}
                    />
                    {/* Assistant message container */}
                    <div className="mt-4">
                      {(status === "streaming" || status === "ready") &&
                        lastTextMessage && (
                          <div className="p-4 bg-white rounded-xl">
                            <div className="text-gray-700 prose prose-sm max-w-none prose-p:my-0 prose-headings:my-0 prose-ul:my-0 prose-li:my-0">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {lastTextMessage.content}
                              </ReactMarkdown>
                            </div>
                          </div>
                        )}
                    </div>
                  </>
                ) : (
                  <WeatherCardSkeleton />
                )}
              </div>
            </div>
          </div>

          {/* Input area (bottom) */}
          <div className="fixed bottom-0 w-full bg-white">
            <div className="max-w-[480px] mx-auto p-4">
              <form
                onSubmit={handleSubmit}
                className="bg-neutral-100 rounded-full p-2 flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter city name (e.g., Tokyo, New York)"
                  className="flex-grow p-2 px-4 bg-transparent border-none outline-none"
                  disabled={
                    (status as Status) === "streaming" ||
                    (status as Status) === "submitted"
                  }
                />
                <button
                  type="submit"
                  className="bg-neutral-100 text-neutral-800 p-2 rounded-full hover:bg-neutral-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    (status as Status) === "streaming" ||
                    (status as Status) === "submitted"
                  }
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        /* Initial centered form */
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[480px] p-4">
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-100 rounded-full p-2 flex items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter city name (e.g., Tokyo, New York)"
                className="flex-grow p-2 px-4 bg-transparent border-none outline-none"
                disabled={
                  (status as Status) === "streaming" ||
                  (status as Status) === "submitted"
                }
              />
              <button
                type="submit"
                className="bg-neutral-100 text-neutral-800 p-2 rounded-full hover:bg-neutral-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  (status as Status) === "streaming" ||
                  (status as Status) === "submitted"
                }
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
