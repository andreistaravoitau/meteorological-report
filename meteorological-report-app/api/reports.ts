import { WeatherReport } from "@/types/weatherReport";

const API_ENDPOINT = "http://localhost:8000/api/reports";

export class ReportsApi {
  private baseUrl: string;

  constructor(baseUrl: string = API_ENDPOINT) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(`API Error (${res.status}): ${errorMsg}`);
    }

    return res.json();
  }

  async getAll(): Promise<WeatherReport[]> {
    return this.request<WeatherReport[]>("");
  }

  async getById(id: string): Promise<WeatherReport> {
    return this.request<WeatherReport>(`/${id}`);
  }

  async create(report: Omit<WeatherReport, "id">): Promise<WeatherReport[]> {
    return this.request<WeatherReport[]>("", {
      method: "POST",
      body: JSON.stringify(report),
    });
  }

  async update(
    id: string,
    report: Omit<WeatherReport, "id">
  ): Promise<WeatherReport[]> {
    return this.request<WeatherReport[]>(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(report),
    });
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(`API Error (${res.status}): ${errorMsg}`);
    }
  }
}
