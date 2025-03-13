"use client";

import { ReportsApi } from "@/api/reports";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { WeatherReport } from "@/types/weatherReport";
import {
  WeatherFormValues,
  WeatherReportSchema,
} from "@/utils/validation/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface WeatherFormProps {
  report?: WeatherReport | null;
}

const reportsApi = new ReportsApi();

export default function WeatherForm({ report }: WeatherFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(report);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setError,
  } = useForm<WeatherFormValues>({
    resolver: zodResolver(WeatherReportSchema),
    defaultValues: {
      city: "",
      temperature: 0,
      unit: "C",
      date: new Date().toISOString().split("T")[0],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (report) reset(report);
  }, [report]);

  const onSubmit: SubmitHandler<WeatherFormValues> = async (data) => {
    if (data.unit === "C" && data.temperature < -273.15) {
      setError("temperature", {
        message: "Temperature cannot be below -273.15°C.",
      });
      return;
    }
    if (data.unit === "F" && data.temperature < -459.67) {
      setError("temperature", {
        message: "Temperature cannot be below -459.67°F.",
      });
      return;
    }
    if (data.unit === "K" && data.temperature < 0) {
      setError("temperature", { message: "Temperature cannot be below 0K." });
      return;
    }

    try {
      if (isEditMode && report) {
        await reportsApi.update(report.id, data);
      } else {
        await reportsApi.create(data);
      }
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl border border-gray-200 p-6 mt-6">
      <h2 className="text-lg md:text-2xl font-semibold text-gray-700 mb-4">
        {isEditMode ? "Edit Weather Report" : "Add Weather Report"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label="City"
            type="text"
            {...register("city")}
            className="w-full"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Temperature"
            type="number"
            {...register("temperature", { valueAsNumber: true })}
            className="w-full"
          />
          {errors.temperature && (
            <p className="text-red-500 text-sm mt-1">
              {errors.temperature.message}
            </p>
          )}
        </div>

        <div>
          <Select
            label="Unit"
            {...register("unit")}
            options={[
              { value: "C", label: "Celsius (°C)" },
              { value: "F", label: "Fahrenheit (°F)" },
              { value: "K", label: "Kelvin (K)" },
            ]}
            className="w-full"
          />
          {errors.unit && (
            <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Date"
            type="date"
            {...register("date")}
            className="w-full"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 text-lg"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : isEditMode
            ? "Update Report"
            : "Submit"}
        </Button>
      </form>
    </div>
  );
}
