type AnalyticsValue = string | number | boolean | undefined | null | readonly string[];
type AnalyticsParams = Record<string, AnalyticsValue>;
type CheckoutPlanId = "basic" | "premium";

const INITIATE_CHECKOUT_PARAMS: Record<CheckoutPlanId, AnalyticsParams> = {
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
    ttq?: {
      track?: (name: string, params?: AnalyticsParams) => void;
    };
  }
}

export function trackTikTokEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  window.ttq?.track?.(name, params);
}

export function trackInitiateCheckout(plan: CheckoutPlanId) {
  if (typeof window === "undefined") return;

  // O Meta é rastreado pela UTMify; aqui preservamos apenas GA/dataLayer.
  const params = INITIATE_CHECKOUT_PARAMS[plan];

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

  window.ttq?.track?.(name, params);
}
