import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import SettingsPage from "../components/routes/SettingsPage";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SettingsPage />
    </>
  );
}
