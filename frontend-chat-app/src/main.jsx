import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, Router } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { SettingsProvider } from "./context/SettingsContext";

import { routeTree } from "./routeTree.gen";

const router = new Router({ routeTree });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsProvider>
      <RouterProvider router={router} />
      <Toaster />
    </SettingsProvider>
  </StrictMode>
);
