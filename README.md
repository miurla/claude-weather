# Claude Weather App

This project demonstrates how to build a working application based on a component design created by Claude 3.7 Sonnet. It originated from this tweet showcasing Claude's improved frontend design capabilities:

> Claude 3.7 Sonnet frontend design has noticeably improved! 🎨
> [@miiura/status/1894179764996641211](https://twitter.com/miiura/status/1894179764996641211)

This is a practical example for developers who want to see how to implement AI-generated designs into a fully functional application. The app combines weather data with AI-powered chat functionality to provide weather information in a conversational format.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **AI**: [Vercel AI SDK](https://sdk.vercel.ai/docs) for type-safe AI chat
- **APIs**:
  - OpenWeather API for weather data
  - OpenAI API for chat functionality
- **Deployment**: Vercel

## Setup

1. Clone the repository:

```bash
git clone https://github.com/miurla/claude-weather.git
cd claude-weather
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your API keys:

- Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- Get your OpenWeather API key from [OpenWeather](https://home.openweathermap.org/api_keys)

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

Deploy your own copy of this app using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmiurla%2Fclaude-weather)
