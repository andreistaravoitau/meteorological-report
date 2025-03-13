"use client";
import WeatherForm from "@/components/weather/WeatherForm";
import { Suspense } from "react";

export default function CreateWeatherReportPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-6 max-w-lg mx-auto">
        <WeatherForm />
      </div>
    </Suspense>
  );
}
