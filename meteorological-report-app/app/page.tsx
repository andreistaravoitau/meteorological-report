"use client";

import WeatherForm from "@/components/weather/WeatherForm";
import { WeatherReportsContainer } from "@/containers/WeatherReportContainer";

export default function HomePage() {
  return (
    <main>
      <h1>Weather Reports</h1>
      <WeatherReportsContainer />
      <WeatherForm />
    </main>
  );
}
