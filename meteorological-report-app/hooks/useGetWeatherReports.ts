import { useEffect, useState } from "react";
import { ReportsApi } from "@/api/reports";
import { WeatherReport } from "@/types/weatherReport";

const reportsApi = new ReportsApi();

export const useGetWeatherReports = () => {
  const [reports, setReports] = useState<WeatherReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    reportsApi
      .getAll()
      .then(setReports)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { reports, loading, error };
};
