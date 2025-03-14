"use client";

import { useGetWeatherReports } from "@/hooks/useGetWeatherReports";
import { WeatherReportList } from "@/components/weather/WeatherReportList";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const WeatherReportsContainer = () => {
  const { reports, loading, error } = useGetWeatherReports();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="container mx-auto my-8 p-6 w-4/5 bg-white  rounded-xl">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-3xl font-bold text-gray-800">Weather Reports</h1>
        <Link href="/new">
          <Button variant="primary">New Report</Button>
        </Link>
      </div>
      <WeatherReportList reports={reports} />
    </div>
  );
};
