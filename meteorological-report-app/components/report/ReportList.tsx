import { WeatherReport } from "@/types/wetherReport";
import { WeatherReportItem } from "./ReportItem";

interface WeatherReportListProps {
  reports: WeatherReport[];
}

export const WeatherReportList = ({ reports }: WeatherReportListProps) => {
  return (
    <ul>
      {reports.map((report) => (
        <WeatherReportItem key={report.id} report={report} />
      ))}
    </ul>
  );
};
