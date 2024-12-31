import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <h1>The Profile Page</h1>
    </div>
  );
}
