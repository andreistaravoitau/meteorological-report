import { WeatherReport } from "@/types/weatherReport";
import { WeatherReportItem } from "./WeatherReportItem";
import { useState } from "react";
import { deleteWeatherReport } from "@/hooks/deleteWeatherReport";
import { ReportsApi } from "@/api/reports";
import { toKelvin } from "@/utils/toKelvin";
import { getNextSortDirection, sortReports } from "@/utils/sorting";

const reportsApi = new ReportsApi();

interface WeatherReportListProps {
  reports?: WeatherReport[];
}

export const WeatherReportList = ({ reports = [] }: WeatherReportListProps) => {
  const [localReports, setLocalReports] = useState<WeatherReport[]>(reports);
  const { deleteReport } = deleteWeatherReport();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof WeatherReport | "temperature" | null;
    direction: "asc" | "desc" | null;
  }>({
    key: null,
    direction: null,
  });

  const fetchReports = async () => {
    try {
      const updatedReports = await reportsApi.getAll();
      setLocalReports(updatedReports);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    }
  };

  const handleDelete = (id: string) => {
    deleteReport(id, () => {
      fetchReports();
    });
  };

  const handleSort = (key: keyof WeatherReport | "temperature") => {
    const direction = getNextSortDirection(
      sortConfig.key,
      sortConfig.direction,
      key
    );
    setSortConfig({ key: direction ? key : null, direction });

    if (!direction) {
      fetchReports();
      return;
    }

    setLocalReports(sortReports(localReports, key, direction));
  };

  return (
    <div className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className="md:grid grid-cols-4 gap-4 items-center border-b-2 pb-2 hidden">
        <button onClick={() => handleSort("city")}>
          <h2 className="text-lg font-semibold text-gray-700 col-span-1">
            City
            {sortConfig?.key === "city"
              ? sortConfig.direction === "asc"
                ? "▲"
                : "▼"
              : "↑↓"}
          </h2>
        </button>
        <button
          className="text-lg font-semibold text-gray-700 col-span-1"
          onClick={() => handleSort("date")}
        >
          Date{" "}
          {sortConfig?.key === "date"
            ? sortConfig.direction === "asc"
              ? "▲"
              : "▼"
            : "↑↓"}
        </button>
        <button
          className="text-lg font-semibold text-gray-700 col-span-1"
          onClick={() => handleSort("temperature")}
        >
          Temperature{" "}
          {sortConfig?.key === "temperature"
            ? sortConfig.direction === "asc"
              ? "▲"
              : "▼"
            : "↑↓"}
        </button>
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
