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

    try {
      await reportsApi.create({
        city: formData.city,
        temperature: Number(formData.temperature),
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
