"use client";

import { Suspense } from "react";
import WeatherEditPage from "./edit";

export default function EditPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WeatherEditPage />
    </Suspense>
  );
}
