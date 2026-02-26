import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  measurePagePerformance,
  preloadCriticalResources,
  trackHashNavigation,
} from "./utils/performance";

// Initialize performance monitoring
if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
  measurePagePerformance();
  preloadCriticalResources();
  trackHashNavigation();

  // Setup Google Analytics
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-83XWKZH0QC";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    (window.dataLayer as any).push(arguments);
  }
  (window as any).gtag = gtag;
  gtag("js", new Date());
  gtag("config", "G-83XWKZH0QC");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
