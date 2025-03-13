import { WeatherReport } from "@/types/weatherReport";
import { toKelvin } from "@/utils/toKelvin";
import { Button } from "../ui/Button";
import Link from "next/link";

interface WeatherReportItemProps {
  report: WeatherReport;
  onDelete: () => void;
}

export const WeatherReportItem = ({
  report,
  onDelete,
}: WeatherReportItemProps) => {
  return (
    <div className="flex flex-row justify-between items-center p-4 border border-gray-200 rounded-xl break-all">
      <div>
        <p>City: {report.city}</p>
        <p>
          Temperature: {toKelvin(report.temperature, report.unit).toFixed(2)} K
        </p>
      </div>

      <div>
        <p>Date: {report.date}</p>
      </div>
      <Link href={`/edit?id=${report.id}`}>
        <Button variant="secondary">Edit</Button>
      </Link>
      <Button variant="danger" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
};
