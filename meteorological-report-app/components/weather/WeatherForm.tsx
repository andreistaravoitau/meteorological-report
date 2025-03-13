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
    watch,
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
    if (report) {
      reset(report);
    }
  }, [report]);

  console.log(watch());

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
      setError("temperature", {
        message: "Temperature cannot be below 0K.",
      });
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
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">
        {isEditMode ? "Edit Weather Report" : "Add Weather Report"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="City" type="text" {...register("city")} />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}

        <Input
          label="Temperature"
          type="number"
          {...register("temperature", { valueAsNumber: true })}
        />
        {errors.temperature && (
          <p className="text-red-500">{errors.temperature.message}</p>
        )}

        <Select
          label="Unit"
          {...register("unit")}
          options={[
            { value: "C", label: "Celsius (°C)" },
            { value: "F", label: "Fahrenheit (°F)" },
            { value: "K", label: "Kelvin (K)" },
          ]}
        />
        {errors.unit && <p className="text-red-500">{errors.unit.message}</p>}

        <Input label="Date" type="date" {...register("date")} />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}

        <Button
          type="submit"
          variant="primary"
          className="p-2 bg-blue-500 text-white rounded"
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
