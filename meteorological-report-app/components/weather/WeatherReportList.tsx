import { WeatherReport } from "@/types/wetherReport";
import { WeatherReportItem } from "./WeatherReportItem";
import { useState } from "react";
import { deleteWeatherReport } from "@/hooks/deleteWeatherReport";

interface WeatherReportListProps {
  reports: WeatherReport[];
}

export const WeatherReportList = ({ reports }: WeatherReportListProps) => {
  const [localReports, setLocalReports] = useState(reports);
  const { deleteReport, loading, error } = deleteWeatherReport();

  const handleDelete = (id: string) => {
    deleteReport(id, () => {
      setLocalReports(localReports.filter((report) => report.id !== id));
    });
  };

  return (
    <ul>
      {reports.map((report) => (
        <WeatherReportItem
          key={report.id}
          report={report}
          onDelete={() => handleDelete(report.id)}
        />
      ))}
    </ul>
  );
};
