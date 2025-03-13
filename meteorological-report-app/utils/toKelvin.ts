export const toKelvin = (
  temperature: number,
  unit: "C" | "K" | "F"
): number => {
  switch (unit) {
    case "C":
      return temperature + 273.15;
    case "F":
      return ((temperature - 32) * 5) / 9 + 273.15;
    case "K":
      return temperature;
    default:
      throw new Error(`Unknown temperature unit: ${unit}`);
  }
};
