import { WeatherReport } from "@/types/weatherReport";
import { toKelvin } from "@/utils/toKelvin";

export const getNextSortDirection = (
  currentKey: string | null,
  currentDirection: "asc" | "desc" | null,
  newKey: string
) => {
  if (currentKey !== newKey) return "asc";
  if (currentDirection === "asc") return "desc";
  return null;
};

export const sortReports = (
  reports: WeatherReport[],
  key: keyof WeatherReport | "temperature",
  direction: "asc" | "desc" | null
) => {
  if (!direction) return reports;

  return [...reports].sort((a, b) => {
    let valueA: any =
      key === "temperature" ? toKelvin(a.temperature, a.unit) : a[key];
    let valueB: any =
      key === "temperature" ? toKelvin(b.temperature, b.unit) : b[key];

    if (typeof valueA === "string" && typeof valueB === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    return direction === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });
};
