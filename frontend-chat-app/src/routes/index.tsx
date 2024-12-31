import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../components/Home/HomePage";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <HomePage />
    </>
  );
}
