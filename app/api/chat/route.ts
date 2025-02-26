import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

// OpenWeather API base URL and key
const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Fetch weather data
async function fetchWeatherData(location: string) {
  try {
    // First, get coordinates for the location
    const geoResponse = await fetch(
      `${WEATHER_API_BASE_URL}/weather?q=${encodeURIComponent(
        location
      )}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!geoResponse.ok) {
      throw new Error(
        `Weather API responded with status: ${geoResponse.status}`
      );
    }

    const data = await geoResponse.json();

    // Format the result to match the expected format for the WeatherApp component
    return {
      location: data.name,
      current: {
        temperature: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      },
      forecast: {
        high: data.main.temp_max,
        low: data.main.temp_min,
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
    maxSteps: 2,
  });

  return result.toDataStreamResponse();
}
