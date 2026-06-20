type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (name: string, params?: AnalyticsParams) => void;
      page: () => void;
      load: (id: string) => void;
    };
  }
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  // Google Analytics
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  } else {
    window.dataLayer?.push({ event: name, ...params });
  }

  // Meta Pixel (Facebook)
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", name, params);
  }

  // TikTok Pixel
  if (typeof window.ttq?.track === "function") {
    window.ttq.track(name, params);
  }
}
