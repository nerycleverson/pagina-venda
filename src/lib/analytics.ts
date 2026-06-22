type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track?: (name: string, params?: AnalyticsParams) => void;
    };
  }
}

export function trackTikTokEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  window.ttq?.track?.(name, params);
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  } else {
    window.dataLayer?.push({ event: name, ...params });
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", name, params);
  }

  window.ttq?.track?.(name, params);
}
