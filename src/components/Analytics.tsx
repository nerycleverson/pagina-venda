import Script from "next/script";

const DEFAULT_META_PIXEL_ID = "836514669072252";
const DEFAULT_UTMIFY_PIXEL_ID = "6a3d9a9eb47bc5517b0135dd";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || DEFAULT_META_PIXEL_ID;
  const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const utmifyPixelId = process.env.NEXT_PUBLIC_UTMIFY_PIXEL_ID || DEFAULT_UTMIFY_PIXEL_ID;

  const metaScript =
    "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
    "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;" +
    "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;" +
    "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}" +
    "(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');" +
    "fbq('init'," + JSON.stringify(metaPixelId) + ");fbq('track','PageView');";

  const utmifyScript =
    "window.pixelId = " + JSON.stringify(utmifyPixelId) + ";" +
    "var a = document.createElement('script');" +
    "a.setAttribute('async', '');" +
    "a.setAttribute('defer', '');" +
    "a.setAttribute('src', 'https://cdn.utmify.com.br/scripts/pixel/pixel.js');" +
    "document.head.appendChild(a);";

  const tiktokScript =
    "!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];" +
    "ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];" +
    "ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};" +
    "for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);" +
    "ttq.load=function(e,n){var r='https://analytics.tiktok.com/i18n/pixel/events.js';" +
    "var a=document.createElement('script');a.type='text/javascript';a.async=!0;" +
    "a.src=r+'?sdkid='+e+'&lib='+t;var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(a,s)};" +
    "ttq.load(" + JSON.stringify(tiktokPixelId) + ");ttq.page();}(window,document,'ttq');";

  return (
    <>
      <Script id="meta-pixel-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: metaScript }} />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      <Script id="utmify-pixel-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: utmifyScript }} />

      {tiktokPixelId && (
        <Script id="tiktok-pixel-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: tiktokScript }} />
      )}

      {gaId && (
        <Script
          src={"https://www.googletagmanager.com/gtag/js?id=" + gaId}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}