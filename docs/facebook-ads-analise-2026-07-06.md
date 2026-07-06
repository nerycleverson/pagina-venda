# Análise Facebook Ads - 2026-07-06

## Contexto

Conta: `chocolaterende` (`995571086270378`).

Campanha analisada: `docezap`.

Período do teste novo: 2026-07-03 a 2026-07-06.

Status no momento da análise: conta `UNSETTLED`. A entrega tende a ficar travada até resolver cobrança/verba.

## Leitura dos números

Campanha ativa, conjunto ativo, orçamento do conjunto: R$25/dia.

Gasto total no período: R$52,04.

Por anúncio:

- `REELS`: R$40,88 gastos, 1.442 impressões, 31 cliques no link, 23 visualizações de página, 0 InitiateCheckout, 0 compra.
- `CARROSEL 2`: R$2,99 gastos, 53 impressões, 0 clique, 0 visualização de página.
- `CARROSEL`: R$8,17 gastos, 102 impressões, 1 clique no link, 0 visualização de página. Anúncio pausado.

O Reels é o único criativo com dado útil. O clique para página está barato, mas ainda não virou intenção de checkout.

## Quebra importante do Reels

Melhor posicionamento:

- Instagram Reels em celular: tráfego mais barato e maior volume de cliques.
- Feed do Instagram: mais caro e com menos sinal.

Melhor faixa até agora:

- Mulheres 25-34: R$16,59 gastos, 22 cliques no link, 16 visualizações de página.

35-44 e 45-54 ainda não estão descartadas, mas ficaram mais caras nesse volume pequeno.

## Diagnóstico

Não dá para chamar o Reels de ruim. Ele cumpriu a primeira parte: chamou atenção e levou gente para a página.

O problema está depois da visualização da página:

- 23 visualizações de página.
- 0 InitiateCheckout.
- 0 compra.

Ainda não bateu a condição de saída de R$75 com 0 IC, mas já entrou na faixa de revisão do Reels entre R$25 e R$50.

Hipótese principal: o anúncio entra por uma cena concreta de preço/desconto, mas a primeira dobra da página estava abrindo mais ampla, com "organizar o WhatsApp" e botão de compra direto. Para tráfego frio vindo de Reels, isso pode ficar cedo demais.

## Ajuste feito na página

Alteração em `src/components/landing/DemoLanding.tsx`:

- H1 ficou mais próximo do ângulo do anúncio: preço, desconto e cliente sumida.
- CTA principal virou "Ver resposta para desconto", levando a pessoa para a demonstração antes da compra.
- Botão de compra continua na primeira dobra como opção secundária.
- Preços do Kit e Básico ficaram visíveis nos selos da primeira dobra.

Não foi alterado:

- checkout;
- pixel;
- UTMify;
- links de compra;
- preço;
- oferta;
- disparo de InitiateCheckout.

## Decisão para amanhã

Quando a conta voltar a rodar:

1. Não trocar a oferta ainda.
2. Deixar o Reels rodar até completar R$75 de gasto total no criativo ou até aparecer IC.
3. Se chegar em R$75 com 0 IC, pausar o Reels ou criar nova versão com uma ponte mais forte para a página.
4. Não tomar decisão pelo `CARROSEL 2` ainda, porque ele quase não teve entrega.
5. Se possível, concentrar avaliação em Instagram Reels antes de mexer em público.

## Próximo criativo recomendado

Ângulo:

> A cliente pediu desconto e você respondeu no improviso.

Roteiro curto:

1. "A cliente manda: tem como fazer um descontinho?"
2. "Você sabe que não pode baixar, mas também não quer parecer grossa."
3. "O DoceZap te ajuda a montar uma resposta firme, educada e revisável."
4. Mostrar a resposta sugerida na tela.
5. Fechar com: "Kit WhatsApp da Confeitaria: respostas, combinados, cardápio e datas. A partir de R$19,90."

Esse criativo conversa melhor com a página ajustada do que um anúncio genérico sobre organização.
