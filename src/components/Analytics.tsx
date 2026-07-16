import Script from "next/script";

const DEFAULT_UTMIFY_PIXEL_ID = "6a3d9a9eb47bc5517b0135dd";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const utmifyPixelId = process.env.NEXT_PUBLIC_UTMIFY_PIXEL_ID || DEFAULT_UTMIFY_PIXEL_ID;

  const gaScript =
    "window.dataLayer = window.dataLayer || [];" +
    "function gtag(){dataLayer.push(arguments);}" +
    "window.gtag = gtag;" +
    "gtag('js', new Date());" +
    "gtag('config', " + JSON.stringify(gaId) + ");";

  const tiktokScript =
    "!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];" +
    "ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];" +
    "ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};" +
    "for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);" +
    "ttq.instance=function(t){var e=ttq._i[t]||[];for(var n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};" +
    "ttq.load=function(e,n){var r='https://analytics.tiktok.com/i18n/pixel/events.js',o=n&&n.partner;" +
    "ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;" +
    "ttq._o=ttq._o||{};ttq._o[e]=n||{};var a=document.createElement('script');a.type='text/javascript';a.async=!0;" +
    "a.src=r+'?sdkid='+e+'&lib='+t;var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(a,s)};" +
    "ttq.load(" + JSON.stringify(tiktokPixelId) + ");ttq.page();}(window,document,'ttq');";

  // A UTMify é a única responsável pelos eventos padrão do Meta nesta página.
  const utmifyScript =
    "window.pixelId = " + JSON.stringify(utmifyPixelId) + ";" +
    "var a = document.createElement('script');" +
    "a.setAttribute('async', '');" +
    "a.setAttribute('defer', '');" +
    "a.setAttribute('src', 'https://cdn.utmify.com.br/scripts/pixel/pixel.js');" +
    "document.head.appendChild(a);";

  return (
    <>
      {gaId && (
        <>
          <Script
            src={"https://www.googletagmanager.com/gtag/js?id=" + gaId}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gaScript }} />
        </>
      )}
      {tiktokPixelId && (
        <Script id="tiktok-pixel-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: tiktokScript }} />
      )}
      {utmifyPixelId && (
        <Script id="utmify-pixel-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: utmifyScript }} />
      )}
    </>
  );
}
