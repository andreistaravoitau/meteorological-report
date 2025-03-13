import { WeatherReport } from "@/types/weatherReport";
import { WeatherReportItem } from "./WeatherReportItem";
import { useEffect, useState } from "react";
import { deleteWeatherReport } from "@/hooks/deleteWeatherReport";
import { ReportsApi } from "@/api/reports";
import { toKelvin } from "@/utils/toKelvin";

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
  } | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("");

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
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig?.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }
    setSortConfig({ key: direction ? key : null, direction });

    if (!direction) {
      setLocalReports(reports);
      return;
    }

    const sortedReports = [...localReports].sort((a, b) => {
      let valueA: any = a[key];
      let valueB: any = b[key];

      if (key === "temperature") {
        valueA = toKelvin(a.temperature, a.unit);
        valueB = toKelvin(b.temperature, b.unit);
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setLocalReports(sortedReports);
  };

  const filteredReports = selectedCity
    ? localReports.filter((report) =>
        report.city.toLowerCase().includes(selectedCity.toLowerCase())
      )
    : localReports;

  return (
    <div className="space-y-4 bg-gray-100 p-6 rounded-lg">
      <div className="flex items-center gap-4 mb-4">
        <label className="text-lg font-semibold text-gray-700">
          Filter by City:
        </label>
        <input
          type="text"
          placeholder="Enter city name"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 border rounded-lg shadow-sm focus:ring text-gray-700"
        />
      </div>
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
      {filteredReports.map((report) => (
        <WeatherReportItem
          key={report.id}
          report={report}
          onDelete={() => handleDelete(report.id)}
        />
      ))}
    </div>
  );
};
