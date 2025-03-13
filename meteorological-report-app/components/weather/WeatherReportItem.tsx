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
    <div className="grid md:grid-cols-4 p-4 bg-white shadow-md rounded-lg items-center md:justify-items-normal justify-items-center hover:shadow-lg transition duration-200">
      <div className="col-span-1 text-gray-800 font-semibold md:ml-10 ml-1">
        <p>{report.city}</p>
      </div>

      <p className="col-span-1 text-gray-600">{report.date}</p>
      <p className="col-span-1 font-bold text-gray-900">
        {toKelvin(report.temperature, report.unit).toFixed(2)} K
      </p>
      <div className="col-span-1 space-x-2 ">
        <Link href={`/edit?id=${report.id}`}>
          <Button variant="secondary" className="my-1 w-20">
            Edit
          </Button>
        </Link>
        <Button variant="danger" className="w-20" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
