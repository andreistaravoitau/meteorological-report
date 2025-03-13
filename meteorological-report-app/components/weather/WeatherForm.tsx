import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { createWeatherForm } from "@/hooks/createWeatherReport";

export default function WeatherForm() {
  const { formData, handleChange, handleSubmit, loading, error, success } =
    createWeatherForm();

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Add Weather Report</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="City"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <Input
          label="Temperature"
          type="number"
          name="temperature"
          value={formData.temperature}
          onChange={handleChange}
          required
        />
        <Select
          label="Unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          options={[
            { value: "C", label: "Celsius (°C)" },
            { value: "F", label: "Fahrenheit (°F)" },
            { value: "K", label: "Kelvin (K)" },
          ]}
        />
        <Input
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
