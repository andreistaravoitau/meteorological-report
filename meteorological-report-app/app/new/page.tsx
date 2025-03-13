"use client";
import WeatherForm from "@/components/weather/WeatherForm";

export default function CreateWeatherReportPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Weather Report</h1>
      <WeatherForm />
    </main>
  );
}
