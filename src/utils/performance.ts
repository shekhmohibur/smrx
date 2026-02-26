/**
 * Performance optimization and analytics configuration
 * Helps improve Core Web Vitals and SEO ranking
 */

// Monitor Core Web Vitals
export function reportWebVitals() {
  if ("web-vital" in window) {
    window.addEventListener("web-vital", (event: any) => {
      const { name, delta, value } = event.detail;
      console.log(`${name}: ${value} (delta: ${delta})`);

      // Send to analytics service
      if ((window as any).gtag) {
        (window as any).gtag("event", name, {
          value: Math.round(value),
          event_category: "Web Vitals",
          event_label: name,
          non_interaction: true,
        });
      }
    });
  }
}

// Preload critical resources
export function preloadCriticalResources() {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => {
      // Preload images, fonts, etc.
      const preloadLinks = [
        {
          href: "https://avatars.githubusercontent.com/u/119482264?s=400",
          as: "image",
        },
      ];

      preloadLinks.forEach(({ href, as }) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = as;
        link.href = href;
        document.head.appendChild(link);
      });
    });
  }
}

// Monitor page performance
export function measurePagePerformance() {
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            const navigationEntry = performance.getEntriesByType(
              "navigation",
            )[0] as PerformanceNavigationTiming;
            if (navigationEntry) {
              console.log("Page Load Metrics:", {
                domContentLoaded:
                  navigationEntry.domContentLoadedEventEnd -
                  navigationEntry.domContentLoadedEventStart,
                loadComplete:
                  navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
                domInteractive:
                  navigationEntry.domInteractive - navigationEntry.fetchStart,
              });
            }
          }
        }
      });

      observer.observe({ entryTypes: ["navigation"] });
    } catch (err) {
      console.log("Performance monitoring not available");
    }
  }
}

// Track hash navigation for analytics
export function trackHashNavigation() {
  const handleHashChange = () => {
    const hash = window.location.hash;
    if ((window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_path: hash || "/",
        page_title: document.title,
      });
    }
  };

  window.addEventListener("hashchange", handleHashChange);
  return () => window.removeEventListener("hashchange", handleHashChange);
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
