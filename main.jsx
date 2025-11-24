import { createRoot } from "react-dom/client";
import "./src/task-manager.css";
import TaskManager from "./src/task-manager.jsx";

createRoot(document.getElementById("root")).render(<TaskManager />);
