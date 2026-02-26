/**
 * Google Analytics Configuration
 *
 * Setup Instructions:
 * 1. Create a Google Analytics 4 property
 * 2. Go to Admin > Property Settings > Data Streams > Web
 * 3. Copy your Measurement ID (G-XXXXXXXXXX)
 * 4. Replace G-YOUR_GA_TRACKING_ID in this file
 * 5. Also update in main.tsx
 */

export const GA_TRACKING_ID = "G-83XWKZH0QC"; // Replace with your ID

export function setupGoogleAnalytics() {
  // Only load in production (browser environment)
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost"
  ) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      ((window as any).dataLayer as any).push(arguments);
    }
    (window as any).gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_TRACKING_ID, {
      send_page_view: true,
      anonymize_ip: true,
    });
  }
}

// Track custom events
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>,
) {
  if ((window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
  }
}

// Track page views (for hash-based navigation)
export function trackPageView(path: string, title: string) {
  if ((window as any).gtag) {
    (window as any).gtag("event", "page_view", {
      page_path: path,
      page_title: title,
    });
  }
}

// Track outbound links
export function trackOutboundLink(url: string) {
  trackEvent("click", {
    event_category: "engagement",
    event_label: "outbound_link",
    value: url,
  });
}

// Track form submissions
export function trackFormSubmission(formName: string) {
  trackEvent("form_submit", {
    form_name: formName,
  });
}
