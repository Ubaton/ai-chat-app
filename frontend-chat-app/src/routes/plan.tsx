import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import PricingSection from "../components/routes/PriceSection";

export const Route = createFileRoute("/plan")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PricingSection />
    </>
  );
}
