"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ReportsApi } from "@/api/reports";
import { WeatherReport } from "@/types/weatherReport";
import WeatherForm from "@/components/weather/WeatherForm";

const reportsApi = new ReportsApi();

export default function WeatherEditPage() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get("id");

  const [report, setReport] = useState<WeatherReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reportId) {
      setError("No report ID provided.");
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      try {
        const data: WeatherReport = await reportsApi.getById(reportId);
        setReport(data);
      } catch (err) {
        setError("Failed to load the report.");
      }
      setLoading(false);
    };

    fetchReport();
  }, [reportId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <main>
      <h1>Edit Weather Report</h1>
      {report && <WeatherForm report={report} />}
    </main>
  );
}
