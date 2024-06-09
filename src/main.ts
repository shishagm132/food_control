import "./app.css";
import App from "./App.svelte";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
