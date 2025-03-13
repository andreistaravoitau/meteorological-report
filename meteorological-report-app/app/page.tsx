"use client";

import { Button } from "@/components/ui/Button";
import { WeatherReportsContainer } from "@/containers/WeatherReportContainer";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Weather Reports</h1>
      <WeatherReportsContainer />
      <Link href="/reports/new">
        <Button variant="primary">New Report</Button>
      </Link>
    </main>
  );
}
