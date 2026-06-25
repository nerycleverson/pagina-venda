type AnalyticsParams = Record<string, string | number | boolean | undefined>;

const META_STANDARD_EVENTS: Record<string, string> = {
  checkout_clicked: "InitiateCheckout",
  offer_viewed: "ViewContent",
};

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
    const metaStandardEvent = META_STANDARD_EVENTS[name];
    if (metaStandardEvent) {
      window.fbq("track", metaStandardEvent, params);
    }
    window.fbq("trackCustom", name, params);
  }

  window.ttq?.track?.(name, params);
}
