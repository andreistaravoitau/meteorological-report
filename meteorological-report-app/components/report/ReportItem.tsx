import { WeatherReport } from "@/types/wetherReport";
import { toKelvin } from "@/utils/toKelvin";

interface WeatherReportItemProps {
  report: WeatherReport;
}

export const WeatherReportItem = ({ report }: WeatherReportItemProps) => {
  return (
    <li>
      <div>
        <p>City: {report.city}</p>
      </div>
      <div>
        <p>
          Temperature: {toKelvin(report.temperature, report.unit).toFixed(2)} K
        </p>
      </div>
      <div>
        <p>Date: {report.date}</p>
      </div>
    </li>
  );
};
