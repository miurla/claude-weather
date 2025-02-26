import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

// Weather API base URL
const WEATHER_API_BASE_URL = "https://api.weatherapi.com/v1";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Fetch weather data
async function fetchWeatherData(location: string) {
  try {
    // Use forecast endpoint to get current weather and forecast data
    const response = await fetch(
      `${WEATHER_API_BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(
        location
      )}&days=1&aqi=no&alerts=no`
    );

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Format the result to match the expected format for the WeatherApp component
    return {
      location: data.location.name,
      current: {
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_mph,
      },
      forecast: {
        high: data.forecast.forecastday[0].day.maxtemp_c,
        low: data.forecast.forecastday[0].day.mintemp_c,
      },
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { error: "Failed to fetch weather data" };
  }
}

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessages = messages.slice(-1);

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system:
      "You are a helpful weather assistant. When asked about weather, use the displayWeather tool to fetch accurate data.",
    messages: lastMessages,
    tools: {
      displayWeather: {
        description: "Get the current weather and forecast for a location",
        parameters: z.object({
          location: z
            .string()
            .describe(
              "The location to get the weather for. City name should be in English."
            ),
        }),
        execute: async ({ location }: { location: string }) => {
          const result = await fetchWeatherData(location);
          return result;
        },
      },
    },
  });

  return result.toDataStreamResponse();
}
