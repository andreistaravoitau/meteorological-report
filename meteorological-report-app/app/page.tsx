"use client";

import { WeatherReportList } from "@/components/report/ReportList";
import { getWeatherReports } from "@/hooks/getWeatherReports";

export default function HomePage() {
  const { reports, loading, error } = getWeatherReports();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <h1>Weather Reports</h1>
      <WeatherReportList reports={reports} />
    </main>
  );
}
