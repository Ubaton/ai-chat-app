import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import UserProfilePage from "../components/routes/UserProfilePage";

export const Route = createFileRoute("/profile")({ component: RouteComponent });

function RouteComponent() {
  return (
    <>
      <UserProfilePage />
    </>
  );
}
