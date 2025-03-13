import { z } from "zod";

export const WeatherReportSchema = z.object({
  temperature: z
    .union([z.number(), z.nan().transform(() => undefined)])
    .refine((value) => value !== undefined, {
      message: "Temperature is required",
    }),
  unit: z.enum(["C", "K", "F"], {
    message: "Unit must be 'C', 'K', or 'F'",
  }),
  city: z
    .string()
    .min(2, "City name should have at least 2 characters")
    .max(100, "City name is too long"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export type WeatherFormValues = z.infer<typeof WeatherReportSchema>;
