import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ReportsApi } from "@/api/reports";
import { useRouter } from "next/navigation";
import { WeatherReport } from "@/types/weatherReport";
import { validateWeatherReport } from "@/utils/validateWeatherReport";

const reportsApi = new ReportsApi();

export const updateWeatherReport = (report: WeatherReport | null) => {
  const [formData, setFormData] = useState({
    city: "",
    temperature: "",
    unit: "C",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (report) {
      setFormData({
        city: report.city,
        temperature: String(report.temperature),
        unit: report.unit,
        date: report.date,
      });
    }
  }, [report]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const temperature = Number(formData.temperature);

    const validationError = validateWeatherReport(
      temperature,
      formData.unit,
      formData.date
    );
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      if (report) {
        await reportsApi.update(report.id, {
          city: formData.city,
          temperature: Number(formData.temperature),
          unit: formData.unit as "C" | "F" | "K",
          date: formData.date,
        });

        setSuccess("Report successfully updated!");
      }
      router.push("/");
    } catch (err) {
      setError("Failed to update the report.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, error, success };
};
