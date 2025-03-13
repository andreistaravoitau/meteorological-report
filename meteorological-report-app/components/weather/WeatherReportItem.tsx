import { WeatherReport } from "@/types/weatherReport";
import { toKelvin } from "@/utils/toKelvin";
import { Button } from "../ui/Button";

interface WeatherReportItemProps {
  report: WeatherReport;
  onDelete: () => void;
}

export const WeatherReportItem = ({
  report,
  onDelete,
}: WeatherReportItemProps) => {
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
      <Button variant="danger" onClick={onDelete}>
        Delete
      </Button>
    </li>
  );
};
