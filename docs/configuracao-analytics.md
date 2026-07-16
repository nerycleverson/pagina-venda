# Configuração de métricas

O site funciona normalmente sem essas variáveis. Para ativar as métricas, cadastre no ambiente do Firebase:

NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

NEXT_PUBLIC_UTMIFY_PIXEL_ID=000000000000000000000000

NEXT_PUBLIC_TIKTOK_PIXEL_ID=D8GRM6BC77U5P5NBPEG0

Substitua os valores pelos identificadores reais do Google Analytics 4, da UTMify e do TikTok.

Os eventos padrão do Meta Pixel (`PageView`, `ViewContent` e `InitiateCheckout`) são enviados somente pelo pixel de otimização da UTMify. Não instale o Meta Pixel manualmente nesta página, pois os dois caminhos registrariam o mesmo evento duas vezes.

No TikTok, a página envia PageView, ViewContent e InitiateCheckout. O evento CompletePayment deve ser enviado apenas pelo checkout ou pela página de compra aprovada.

## Eventos registrados

- quiz_started
- quiz_answered
- funnel_step_viewed
- personalized_response_viewed
- personalized_response_continued
- demo_video_started
- demo_video_completed
- demo_continued
- offer_viewed
- faq_opened
- checkout_clicked

Nenhum desses eventos envia nome, telefone ou e-mail da cliente.
