type AnalyticsValue = string | number | boolean | undefined | null | readonly string[];
type AnalyticsParams = Record<string, AnalyticsValue>;
type CheckoutPlanId = "basic" | "premium";

const META_STANDARD_EVENTS: Record<string, string> = {
  offer_viewed: "ViewContent",
};

const META_INITIATE_CHECKOUT_PARAMS: Record<CheckoutPlanId, AnalyticsParams> = {
  basic: {
    content_name: "DoceZap Básico",
    content_ids: ["docezap_basico"],
    content_type: "product",
    value: 19.9,
    currency: "BRL",
  },
  premium: {
    content_name: "DoceZap Premium + Produtos Extras",
    content_ids: ["docezap_premium"],
    content_type: "product",
    value: 49.9,
    currency: "BRL",
  },
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

export function trackMetaInitiateCheckout(plan: CheckoutPlanId) {
  if (typeof window === "undefined") return;

  const params = META_INITIATE_CHECKOUT_PARAMS[plan];

  if (typeof window.fbq === "function") {
    window.fbq("track", "InitiateCheckout", params);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "InitiateCheckout", params);
  } else {
    window.dataLayer?.push({ event: "InitiateCheckout", plan, ...params });
  }
}

export function buildCheckoutUrlWithCurrentParams(checkoutUrl: string) {
  if (typeof window === "undefined") return checkoutUrl;

  const targetUrl = new URL(checkoutUrl);
  const currentParams = new URLSearchParams(window.location.search);

  currentParams.forEach((value, key) => {
    if (!targetUrl.searchParams.has(key)) {
      targetUrl.searchParams.set(key, value);
    }
  });

  return targetUrl.toString();
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
