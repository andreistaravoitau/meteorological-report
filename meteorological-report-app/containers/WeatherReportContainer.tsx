"use client";

import { getWeatherReports } from "@/hooks/getWeatherReports";
import { WeatherReportList } from "@/components/weather/WeatherReportList";
import { useState, useEffect } from "react";

export const WeatherReportsContainer = () => {
  const { reports, loading, error } = getWeatherReports();
  const [localReports, setLocalReports] = useState(reports);
  useEffect(() => {
    setLocalReports(reports);
  }, [reports]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <WeatherReportList reports={reports} />;
};
