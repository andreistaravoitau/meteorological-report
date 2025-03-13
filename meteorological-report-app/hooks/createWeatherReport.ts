import { useState, ChangeEvent, FormEvent } from "react";
import { ReportsApi } from "@/api/reports";
import { useRouter } from "next/navigation";

const reportsApi = new ReportsApi();

export const createWeatherForm = () => {
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

  const validateTemperature = (temp: number, unit: string) => {
    if (unit === "C" && temp < -273.15)
      return "Temperature cannot be below -273.15°C.";
    if (unit === "F" && temp < -459.67)
      return "Temperature cannot be below -459.67°F.";
    if (unit === "K" && temp < 0) return "Temperature cannot be below 0K.";
    return null;
  };

  const validateDate = (date: string) => {
    const selectedDate = new Date(date);
    const today = new Date();
    if (selectedDate > today) return "Date cannot be in the future.";
    return null;
  };

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

    const temperatureError = validateTemperature(temperature, formData.unit);
    if (temperatureError) {
      setError(temperatureError);
      setLoading(false);
      return;
    }

    const dateError = validateDate(formData.date);
    if (dateError) {
      setError(dateError);
      setLoading(false);
      return;
    }

    try {
      await reportsApi.create({
        city: formData.city,
        temperature: temperature,
        unit: formData.unit as "C" | "F" | "K",
        date: formData.date,
      });

      setSuccess("Report successfully added!");
      router.push("/");
      setFormData({ city: "", temperature: "", unit: "C", date: "" });
    } catch (err) {
      setError("Failed to submit the report.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, error, success };
};
