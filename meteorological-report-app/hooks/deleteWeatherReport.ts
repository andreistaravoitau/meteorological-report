import { useState } from "react";
import { ReportsApi } from "@/api/reports";

const reportsApi = new ReportsApi();

export const deleteWeatherReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteReport = async (id: string, onSuccess: () => void) => {
    if (!window.confirm("Are you sure?")) return;

    setLoading(true);
    setError(null);

    try {
      await reportsApi.delete(id);
      onSuccess();
    } catch (err) {
      setError("Failed to delete report.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteReport, loading, error };
};
