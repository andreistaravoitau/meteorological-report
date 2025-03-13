import { WeatherReport } from "@/types/weatherReport";
import { WeatherReportItem } from "./WeatherReportItem";
import { useEffect, useState } from "react";
import { deleteWeatherReport } from "@/hooks/deleteWeatherReport";
import { ReportsApi } from "@/api/reports";

const reportsApi = new ReportsApi();

interface WeatherReportListProps {
  reports?: WeatherReport[];
}

export const WeatherReportList = ({ reports = [] }: WeatherReportListProps) => {
  const [localReports, setLocalReports] = useState<WeatherReport[]>(reports);
  const { deleteReport, loading, error } = deleteWeatherReport();

  const fetchReports = async () => {
    try {
      const updatedReports = await reportsApi.getAll();
      setLocalReports(updatedReports);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = (id: string) => {
    deleteReport(id, () => {
      fetchReports();
    });
  };

  return (
    <ul>
      {localReports.map((report) => (
        <WeatherReportItem
          key={report.id}
          report={report}
          onDelete={() => handleDelete(report.id)}
        />
      ))}
    </ul>
  );
};
