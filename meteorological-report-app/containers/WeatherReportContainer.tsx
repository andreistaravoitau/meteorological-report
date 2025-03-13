"use client";

import { getWeatherReports } from "@/hooks/getWeatherReports";
import { WeatherReportList } from "@/components/weather/WeatherReportList";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const WeatherReportsContainer = () => {
  const { reports, loading, error } = getWeatherReports();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto my-4">
      <h1 className="text-2xl">Weather Reports</h1>
      <Link href="/new">
        <Button variant="primary">New Report</Button>
      </Link>

      <WeatherReportList reports={reports} />
    </div>
  );
};
