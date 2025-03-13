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
    <div className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className="md:grid grid-cols-4 gap-4 items-center border-b-2 pb-2 hidden">
        <h2 className="text-lg font-semibold text-gray-700 col-span-1">City</h2>
        <h2 className="text-lg font-semibold text-gray-700 col-span-1">Date</h2>
        <h2 className="text-lg font-semibold text-gray-700 col-span-1">
          Temperature
        </h2>
        <h2 className="text-lg font-semibold text-gray-700 col-span-1">
          Actions
        </h2>
      </div>
      {localReports.map((report) => (
        <WeatherReportItem
          key={report.id}
          report={report}
          onDelete={() => handleDelete(report.id)}
        />
      ))}
    </div>
  );
};
