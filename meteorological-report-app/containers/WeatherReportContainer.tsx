"use client";

import { getWeatherReports } from "@/hooks/getWeatherReports";
import { WeatherReportList } from "@/components/weather/WeatherReportList";

export const WeatherReportsContainer = () => {
  const { reports, loading, error } = getWeatherReports();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <WeatherReportList reports={reports} />;
};
