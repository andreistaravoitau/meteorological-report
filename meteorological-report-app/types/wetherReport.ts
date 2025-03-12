interface WeatherReport {
  id: string;
  temperature: number;
  unit: TemperatureUnit;
  city: string;
  date: string;
}

type TemperatureUnit = "C" | "K" | "F";
