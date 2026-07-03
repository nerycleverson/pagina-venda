# Instruções Para Agentes

Antes de analisar, editar ou sugerir mudanças neste projeto, leia o segundo cérebro:

- `C:\Users\cleve\Downloads\segundo-cerebro-negocios\00-painel.md`
- `C:\Users\cleve\Downloads\segundo-cerebro-negocios\07-memoria-codex.md`
- `C:\Users\cleve\Downloads\segundo-cerebro-negocios\08-estrutura-de-resultado.md`
- `C:\Users\cleve\Downloads\segundo-cerebro-negocios\projetos\chocolate-rende.md`
- `C:\Users\cleve\Downloads\segundo-cerebro-negocios\projetos\docezap.md`
- `C:\Users\cleve\Downloads\segundo-cerebro-negocios\projetos\docezap-tecnico.md`
- `C:\Users\cleve\Downloads\segundo-cerebro-negocios\projetos\pagina-venda.md`

Se o ambiente de segurança bloquear leitura fora deste workspace, peça permissão ao usuário para ler esses arquivos. Não continue assumindo contexto de memória.

## Projeto

Este workspace é a página de vendas do DoceZap/Kit WhatsApp da Confeitaria.

Repositório:

```text
https://github.com/nerycleverson/pagina-venda.git
```

Deploy:

```text
Netlify via GitHub, branch main
```

## Regras de trabalho

- Não alterar arquivos antes de entender o pedido e ler o contexto relevante.
- Separar página de vendas, plataforma do produto, checkout, tracking e criativos.
- Não trocar checkout, pixel, UTMify, estrutura de tracking ou oferta sem pedido explícito.
- Não usar promessas de venda automática.
- Não vender o produto principalmente como IA.
- Não dizer que o DoceZap responde sozinho.
- Não usar linguagem de agência, guru ou marketing genérico.
- Evitar travessão longo em conteúdo público da Chocolate Rende.
- Começar copy e criativos por cenas reais de confeitaria, não por temas abstratos.
- Se a tarefa for técnica, explicar em passos curtos e executar com cuidado.

## Oferta atual

Oferta principal em teste:

```text
Kit WhatsApp da Confeitaria - R$49,90
```

Inclui:

- DoceZap Premium por 30 dias.
- 70 respostas melhores.
- Voz mais personalizada.
- Combinados da Encomenda.
- Cardápio que Rende.
- Datas que Rende.

Entrada:

```text
DoceZap Básico - R$19,90
```

Inclui:

- 30 respostas por 30 dias.

Antes de alterar preços, checkout ou copy final, confira a página e o segundo cérebro, porque a oferta pode mudar.

## Arquivos importantes deste projeto

- `src/components/landing/DemoLanding.tsx`
- `src/lib/analytics.ts`
- `src/components/Analytics.tsx`
- `src/app/layout.tsx`
- `src/app/page.tsx`

## Tracking

Eventos importantes:

- Meta Pixel.
- UTMify.
- `InitiateCheckout`.
- `Purchase`.

Ao mexer em botões de compra:

- Preservar UTMs no redirecionamento.
- Disparar `InitiateCheckout` antes do redirect.
- Aguardar aproximadamente 300ms a 500ms antes de redirecionar.
- Não duplicar eventos sem necessidade.

## Validação

Quando alterar código, rode quando disponível:

```text
npm.cmd run typecheck
npm.cmd run build
```

Depois, se o usuário pedir deploy:

```text
git add .
git commit -m "mensagem"
git push
```

O Netlify deploya automaticamente após o push.
