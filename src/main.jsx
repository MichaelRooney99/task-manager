import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./task-manager.css";
import TaskManager from "./task-manager.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskManager />
  </StrictMode>
);
