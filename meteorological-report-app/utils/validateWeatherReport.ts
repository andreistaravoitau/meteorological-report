export const validateWeatherReport = (
  temperature: number,
  unit: string,
  date: string
): string | null => {
  if (unit === "C" && temperature < -273.15)
    return "Temperature cannot be below -273.15°C.";
  if (unit === "F" && temperature < -459.67)
    return "Temperature cannot be below -459.67°F.";
  if (unit === "K" && temperature < 0) return "Temperature cannot be below 0K.";

  const selectedDate = new Date(date);
  const today = new Date();
  if (selectedDate > today) return "Date cannot be in the future.";

  return null;
};
