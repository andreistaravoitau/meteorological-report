import { WeatherReport } from "@/types/weatherReport";
import { WeatherReportItem } from "./WeatherReportItem";
import { useState } from "react";
import { useDeleteWeatherReport } from "@/hooks/useDeleteWeatherReport";
import { ReportsApi } from "@/api/reports";
import { toKelvin } from "@/utils/toKelvin";

const reportsApi = new ReportsApi();

interface WeatherReportListProps {
  reports?: WeatherReport[];
}

export const WeatherReportList = ({ reports = [] }: WeatherReportListProps) => {
  const [localReports, setLocalReports] = useState<WeatherReport[]>(reports);
  const { deleteReport } = useDeleteWeatherReport();
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

  const toggleSortDirection = () => {
    if (sortConfig?.key) {
      handleSort(sortConfig.key);
    }
  };

  const filteredReports = selectedCity
    ? localReports.filter((report) =>
        report.city.toLowerCase().includes(selectedCity.toLowerCase())
      )
    : localReports;

  return (
    <div className="space-y-4 bg-gray-100 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
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
            City{" "}
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
      <div className="md:hidden flex flex-col gap-2">
        <label className="block text-gray-700 font-semibold">Sort by:</label>
        <select
          className="p-2 border rounded-lg w-full shadow-sm text-gray-700"
          onChange={(e) => handleSort(e.target.value as keyof WeatherReport)}
          value={sortConfig?.key || ""}
        >
          <option value="">None</option>
          <option value="city">City</option>
          <option value="date">Date</option>
          <option value="temperature">Temperature</option>
        </select>
        <button
          className="p-2 border rounded-lg w-full shadow-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
          onClick={toggleSortDirection}
          disabled={!sortConfig?.key}
        >
          {sortConfig?.direction === "asc"
            ? "Sort Descending ▼"
            : sortConfig?.direction === "desc"
            ? "Sort Ascending ▲"
            : "Sort Ascending/Descending ↑↓"}
        </button>
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
