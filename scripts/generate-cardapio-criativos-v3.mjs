import { createRequire } from "node:module";
import { mkdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = resolve(import.meta.dirname, "..");
const outputDir = join(root, "public", "criativos", "cardapio-pronto-v3");
const cakePath = join(outputDir, "assets", "bolo-chocolate-natural.png");
const humanPhotoPath = join(outputDir, "assets", "bastidor-real-confeitaria.jpeg");
const cardapioPath = join(root, "public", "provas", "docezap-cardapio.png");
const responderPath = join(root, "public", "provas", "docezap-responder.png");
const combinadosPath = join(root, "public", "provas", "docezap-combinados.png");

const W = 1080;
const H = 1350;

const colors = {
  cream: "#F7F0E7",
  cream2: "#FFF9F3",
  paper: "#FFFCF8",
  brown: "#2D1B17",
  muted: "#715E57",
  terracotta: "#B9513E",
  terracottaLight: "#F4DDD5",
  green: "#657760",
  greenLight: "#E5ECE1",
  gold: "#D7A142",
  line: "#D9CBC0",
};

const dataUrl = async path => {
  const extension = path.endsWith(".jpg") || path.endsWith(".jpeg") ? "jpeg" : "png";
  return `data:image/${extension};base64,${(await readFile(path)).toString("base64")}`;
};

const [cake, cardapio, responder, combinados] = await Promise.all([
  dataUrl(cakePath),
  dataUrl(cardapioPath),
  dataUrl(responderPath),
  dataUrl(combinadosPath),
]);

const svgOpen = (extra = "") => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors.cream2}"/>
      <stop offset="100%" stop-color="${colors.cream}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#4C2D24" flood-opacity="0.12"/>
    </filter>
    <filter id="shadowSmall" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#4C2D24" flood-opacity="0.10"/>
    </filter>
    ${extra}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1010" cy="130" r="180" fill="${colors.terracottaLight}" opacity="0.35"/>
  <circle cx="70" cy="1260" r="220" fill="${colors.greenLight}" opacity="0.55"/>
`;

const svgClose = "</svg>";

const progress = number => `
  <rect x="904" y="44" width="112" height="48" rx="24" fill="${colors.brown}"/>
  <text x="960" y="76" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="22" font-weight="700">${number}/6</text>
`;

const eyebrow = (text, width = 360) => `
  <rect x="64" y="44" width="${width}" height="48" rx="24" fill="${colors.terracotta}"/>
  <text x="88" y="76" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="0.5">${text}</text>
`;

const brand = (y = 1305) => `
  <text x="64" y="${y}" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2.2">CHOCOLATE RENDE</text>
`;

const image = ({ href, x, y, width, height, id, fit = "slice", radius = 28 }) => `
  <defs>
    <clipPath id="${id}"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}"/></clipPath>
  </defs>
  <image href="${href}" x="${x}" y="${y}" width="${width}" height="${height}"
    preserveAspectRatio="xMidYMid ${fit}" clip-path="url(#${id})"/>
`;

const cardOne = (showProgress = true) => `
${svgOpen()}
  ${showProgress ? progress(1) : ""}
  <rect x="64" y="44" width="390" height="48" rx="24" fill="${colors.terracotta}"/>
  <text x="88" y="76" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="18" font-weight="700">PARA QUEM VENDE BOLOS E DOCES</text>

  <text x="64" y="168" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="78" font-weight="900" letter-spacing="-2">
    <tspan x="64" dy="0">O MESMO BOLO.</tspan>
    <tspan x="64" dy="78">DOIS CARDÁPIOS.</tspan>
  </text>
  <text x="64" y="352" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="36" font-weight="600">Qual deles ajuda a cliente a pedir?</text>

  <rect x="730" y="302" width="286" height="72" rx="36" fill="${colors.brown}"/>
  <text x="873" y="333" text-anchor="middle" fill="#F5D7BE" font-family="Arial, sans-serif" font-size="17" font-weight="700">KIT COMPLETO</text>
  <text x="873" y="360" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="27" font-weight="900">R$ 49,90</text>

  <rect x="64" y="424" width="452" height="800" rx="34" fill="${colors.paper}" stroke="${colors.terracotta}" stroke-width="3" filter="url(#shadowSmall)"/>
  <rect x="86" y="448" width="168" height="42" rx="21" fill="${colors.terracottaLight}"/>
  <text x="170" y="476" text-anchor="middle" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="18" font-weight="800">SÓ MOSTRA</text>
  ${image({ href: cake, x: 88, y: 514, width: 404, height: 354, id: "cake-a", radius: 24 })}
  <text x="102" y="930" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="37" font-weight="800">Bolo de chocolate</text>
  <rect x="102" y="966" width="286" height="14" rx="7" fill="#E4D9D0"/>
  <rect x="102" y="1000" width="222" height="14" rx="7" fill="#EDE4DD"/>
  <text x="102" y="1134" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="26" font-weight="800">Ainda deixa dúvidas.</text>

  <rect x="564" y="424" width="452" height="800" rx="34" fill="${colors.paper}" stroke="${colors.green}" stroke-width="3" filter="url(#shadowSmall)"/>
  <rect x="586" y="448" width="244" height="42" rx="21" fill="${colors.greenLight}"/>
  <text x="708" y="476" text-anchor="middle" fill="${colors.green}" font-family="Arial, sans-serif" font-size="18" font-weight="800">AJUDA A ESCOLHER</text>
  ${image({ href: cake, x: 588, y: 514, width: 404, height: 270, id: "cake-b", radius: 24 })}
  <text x="602" y="838" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="31" font-weight="800">Bolo de chocolate</text>
  <text x="602" y="875" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="31" font-weight="800">com brigadeiro</text>
  <line x1="602" y1="902" x2="976" y2="902" stroke="${colors.line}" stroke-width="2"/>
  <text x="602" y="942" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="23" font-weight="600">20 cm • serve de 18 a 22 pessoas</text>
  <text x="602" y="982" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="25" font-weight="800">A partir de R$ [seu valor]</text>
  <text x="602" y="1022" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="23" font-weight="600">Pedidos com [seu prazo]</text>
  <text x="602" y="1062" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="23" font-weight="600">Retirada ou entrega a combinar</text>
  <rect x="602" y="1100" width="362" height="74" rx="18" fill="${colors.greenLight}"/>
  <text x="783" y="1131" text-anchor="middle" fill="${colors.green}" font-family="Arial, sans-serif" font-size="20" font-weight="800">PARA PEDIR</text>
  <text x="783" y="1158" text-anchor="middle" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="21" font-weight="700">envie data + nº de pessoas</text>

  <text x="1016" y="1278" text-anchor="end" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="17" font-weight="700">EXEMPLO ILUSTRATIVO</text>
  ${brand()}
${svgClose}
`;

const cardTwo = `
${svgOpen()}
  ${progress(2)}
  ${eyebrow("A CONVERSA COMEÇA AQUI", 326)}
  <text x="64" y="170" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="67" font-weight="900" letter-spacing="-1.5">
    <tspan x="64">NO PRIMEIRO, ELA AINDA</tspan>
    <tspan x="64" dy="70">PRECISA PERGUNTAR:</tspan>
  </text>

  <rect x="64" y="352" width="952" height="810" rx="38" fill="${colors.paper}" filter="url(#shadow)"/>
  <rect x="98" y="386" width="234" height="42" rx="21" fill="${colors.terracottaLight}"/>
  <text x="215" y="414" text-anchor="middle" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="18" font-weight="800">EXEMPLO DE CONVERSA</text>

  <rect x="112" y="478" width="706" height="112" rx="28" fill="#F0ECE8"/>
  <text x="150" y="548" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="34" font-weight="700">Esse bolo serve quantas pessoas?</text>
  <text x="770" y="572" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="17">10:42</text>

  <rect x="254" y="622" width="676" height="112" rx="28" fill="${colors.greenLight}"/>
  <text x="294" y="692" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="36" font-weight="700">Qual é o valor?</text>
  <text x="882" y="716" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="17">10:43</text>

  <rect x="112" y="766" width="756" height="112" rx="28" fill="#F0ECE8"/>
  <text x="150" y="836" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="35" font-weight="700">Com quanto tempo preciso pedir?</text>
  <text x="820" y="860" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="17">10:44</text>

  <rect x="254" y="910" width="676" height="112" rx="28" fill="${colors.greenLight}"/>
  <text x="294" y="980" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="35" font-weight="700">Como faço para encomendar?</text>
  <text x="882" y="1004" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="17">10:45</text>

  <rect x="64" y="1196" width="952" height="92" rx="25" fill="${colors.brown}"/>
  <text x="540" y="1233" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="26" font-weight="700">
    <tspan x="540">Quando a informação não aparece, você precisa</tspan>
    <tspan x="540" dy="32">completar a explicação no WhatsApp.</tspan>
  </text>
  ${brand(1330)}
${svgClose}
`;

const cardThree = `
${svgOpen()}
  ${progress(3)}
  ${eyebrow("A DIFERENÇA ESTÁ NA INFORMAÇÃO", 416)}
  <text x="64" y="170" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="64" font-weight="900" letter-spacing="-1.5">
    <tspan x="64">NO SEGUNDO, ELA ENTENDE</tspan>
    <tspan x="64" dy="68">ANTES DE CHAMAR.</tspan>
  </text>

  <rect x="64" y="338" width="952" height="768" rx="38" fill="${colors.paper}" stroke="${colors.green}" stroke-width="3" filter="url(#shadow)"/>
  ${image({ href: cake, x: 92, y: 370, width: 416, height: 440, id: "cake-c", radius: 28 })}
  <rect x="112" y="392" width="124" height="38" rx="19" fill="#FFFFFF" fill-opacity="0.94"/>
  <text x="174" y="418" text-anchor="middle" fill="${colors.green}" font-family="Arial, sans-serif" font-size="17" font-weight="800">EXEMPLO</text>

  <text x="552" y="410" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="38" font-weight="900">Bolo de chocolate</text>
  <text x="552" y="454" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="38" font-weight="900">com brigadeiro</text>

  <rect x="552" y="502" width="390" height="76" rx="18" fill="${colors.greenLight}"/>
  <text x="578" y="533" fill="${colors.green}" font-family="Arial, sans-serif" font-size="17" font-weight="800">TAMANHO E RENDIMENTO</text>
  <text x="578" y="562" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="23" font-weight="700">20 cm • serve 18 a 22 pessoas</text>

  <rect x="552" y="600" width="390" height="76" rx="18" fill="${colors.terracottaLight}"/>
  <text x="578" y="631" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="17" font-weight="800">PREÇO</text>
  <text x="578" y="660" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="23" font-weight="700">A partir de R$ [seu valor]</text>

  <rect x="552" y="698" width="390" height="76" rx="18" fill="#F4EFEA"/>
  <text x="578" y="729" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="17" font-weight="800">PRAZO</text>
  <text x="578" y="758" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="23" font-weight="700">Pedidos com [seu prazo]</text>

  <rect x="92" y="844" width="848" height="106" rx="22" fill="#F4EFEA"/>
  <text x="124" y="881" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="17" font-weight="800">RETIRADA OU ENTREGA</text>
  <text x="124" y="920" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="26" font-weight="700">Condições informadas antes da conversa.</text>

  <rect x="92" y="972" width="848" height="106" rx="22" fill="${colors.greenLight}"/>
  <text x="124" y="1009" fill="${colors.green}" font-family="Arial, sans-serif" font-size="17" font-weight="800">COMO PEDIR</text>
  <text x="124" y="1048" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="26" font-weight="700">A cliente já sabe qual informação precisa enviar.</text>

  <text x="64" y="1176" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="37" font-weight="900">Não é só deixar bonito.</text>
  <text x="64" y="1222" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="31" font-weight="600">É colocar o que ajuda a cliente a escolher.</text>
  <text x="1016" y="1278" text-anchor="end" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="17" font-weight="700">EXEMPLO ILUSTRATIVO</text>
  ${brand()}
${svgClose}
`;

const cardFour = `
${svgOpen()}
  ${progress(4)}
  ${eyebrow("MATERIAL REAL", 208)}
  <text x="64" y="170" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="63" font-weight="900" letter-spacing="-1.5">
    <tspan x="64">VOCÊ RECEBE UM MODELO</tspan>
    <tspan x="64" dy="68">PARA ADAPTAR.</tspan>
  </text>
  <text x="64" y="330" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="31" font-weight="600">Use seus produtos, fotos, preços e informações.</text>

  <rect x="64" y="390" width="630" height="780" rx="36" fill="#FFFFFF" filter="url(#shadow)"/>
  ${image({ href: cardapio, x: 84, y: 410, width: 590, height: 740, id: "screen-cardapio", fit: "meet", radius: 24 })}

  <rect x="730" y="390" width="286" height="780" rx="36" fill="${colors.brown}"/>
  <circle cx="786" cy="468" r="26" fill="${colors.terracotta}"/>
  <text x="786" y="477" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="24" font-weight="900">1</text>
  <text x="832" y="460" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="23" font-weight="800">Veja o que</text>
  <text x="832" y="490" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="23" font-weight="800">precisa incluir</text>

  <line x1="762" y1="546" x2="984" y2="546" stroke="#735A52" stroke-width="2"/>
  <circle cx="786" cy="618" r="26" fill="${colors.gold}"/>
  <text x="786" y="627" text-anchor="middle" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="24" font-weight="900">2</text>
  <text x="832" y="610" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="23" font-weight="800">Use o exemplo</text>
  <text x="832" y="640" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="23" font-weight="800">como referência</text>

  <line x1="762" y1="696" x2="984" y2="696" stroke="#735A52" stroke-width="2"/>
  <circle cx="786" cy="768" r="26" fill="${colors.green}"/>
  <text x="786" y="777" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="24" font-weight="900">3</text>
  <text x="832" y="760" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="23" font-weight="800">Troque pelos</text>
  <text x="832" y="790" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="23" font-weight="800">seus dados</text>

  <rect x="758" y="900" width="230" height="188" rx="24" fill="#FFFFFF" fill-opacity="0.10"/>
  <text x="786" y="946" fill="#F4CBBE" font-family="Arial, sans-serif" font-size="18" font-weight="800">VOCÊ ADAPTA</text>
  <text x="786" y="988" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="24" font-weight="700">Produtos</text>
  <text x="786" y="1024" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="24" font-weight="700">Fotos e preços</text>
  <text x="786" y="1060" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="24" font-weight="700">Prazos e pedidos</text>

  <rect x="64" y="1202" width="952" height="78" rx="24" fill="${colors.greenLight}"/>
  <text x="540" y="1252" text-anchor="middle" fill="${colors.green}" font-family="Arial, sans-serif" font-size="27" font-weight="800">Passo a passo + estrutura para montar o seu.</text>
  ${brand(1330)}
${svgClose}
`;

const cardFive = `
${svgOpen()}
  ${progress(5)}
  ${eyebrow("DEPOIS DO CARDÁPIO", 278)}
  <text x="64" y="170" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="60" font-weight="900" letter-spacing="-1.5">
    <tspan x="64">QUANDO A CLIENTE CHAMA,</tspan>
    <tspan x="64" dy="66">O KIT CONTINUA AJUDANDO.</tspan>
  </text>

  <rect x="64" y="348" width="952" height="410" rx="36" fill="${colors.paper}" stroke="${colors.terracotta}" stroke-width="3" filter="url(#shadowSmall)"/>
  <rect x="88" y="374" width="405" height="358" rx="24" fill="#FFFFFF"/>
  ${image({ href: responder, x: 100, y: 386, width: 381, height: 334, id: "screen-responder", fit: "meet", radius: 18 })}
  <text x="536" y="420" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="18" font-weight="800">DOCEZAP PREMIUM • 30 DIAS</text>
  <text x="536" y="474" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="35" font-weight="900">Até 70 sugestões</text>
  <text x="536" y="516" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="35" font-weight="900">para responder melhor.</text>
  <text x="536" y="578" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="25" font-weight="600">
    <tspan x="536">Cole a mensagem, escolha</tspan>
    <tspan x="536" dy="34">a situação e gere uma sugestão.</tspan>
  </text>
  <rect x="536" y="664" width="414" height="54" rx="18" fill="${colors.terracottaLight}"/>
  <text x="743" y="699" text-anchor="middle" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="20" font-weight="800">VOCÊ REVISA ANTES DE ENVIAR</text>

  <rect x="64" y="796" width="952" height="410" rx="36" fill="${colors.paper}" stroke="${colors.green}" stroke-width="3" filter="url(#shadowSmall)"/>
  <rect x="88" y="822" width="405" height="358" rx="24" fill="#FFFFFF"/>
  ${image({ href: combinados, x: 100, y: 834, width: 381, height: 334, id: "screen-combinados", fit: "meet", radius: 18 })}
  <text x="536" y="868" fill="${colors.green}" font-family="Arial, sans-serif" font-size="18" font-weight="800">COMBINADOS DA ENCOMENDA</text>
  <text x="536" y="922" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="35" font-weight="900">Confirme o pedido</text>
  <text x="536" y="964" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="35" font-weight="900">antes de produzir.</text>
  <text x="536" y="1026" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="25" font-weight="600">
    <tspan x="536">Checklist para organizar sinal,</tspan>
    <tspan x="536" dy="34">alterações, retirada e entrega.</tspan>
  </text>
  <rect x="536" y="1110" width="414" height="54" rx="18" fill="${colors.greenLight}"/>
  <text x="743" y="1145" text-anchor="middle" fill="${colors.green}" font-family="Arial, sans-serif" font-size="20" font-weight="800">A CLIENTE CONFIRMA O RESUMO</text>

  ${brand(1302)}
${svgClose}
`;

const cardSix = `
${svgOpen()}
  ${progress(6)}
  ${eyebrow("OFERTA COMPLETA", 246)}
  <text x="64" y="168" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="57" font-weight="900" letter-spacing="-1.4">
    <tspan x="64">KIT PARA ORGANIZAR</tspan>
    <tspan x="64" dy="62">O CARDÁPIO E OS PEDIDOS</tspan>
  </text>

  <text x="64" y="354" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="84" font-weight="900">R$ 49,90</text>
  <rect x="470" y="300" width="228" height="62" rx="31" fill="${colors.greenLight}"/>
  <text x="584" y="340" text-anchor="middle" fill="${colors.green}" font-family="Arial, sans-serif" font-size="19" font-weight="800">COMPRA ÚNICA</text>

  <rect x="64" y="418" width="952" height="594" rx="38" fill="${colors.paper}" filter="url(#shadow)"/>

  <rect x="92" y="448" width="300" height="214" rx="24" fill="#FFFFFF" stroke="${colors.line}"/>
  ${image({ href: cardapio, x: 106, y: 462, width: 272, height: 186, id: "mini-cardapio", fit: "meet", radius: 16 })}
  <rect x="414" y="448" width="574" height="214" rx="24" fill="${colors.terracottaLight}"/>
  <text x="446" y="494" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="18" font-weight="800">CARDÁPIO QUE RENDE</text>
  <text x="446" y="544" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="32" font-weight="900">Modelo + passo a passo</text>
  <text x="446" y="584" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="24" font-weight="600">para adaptar com seus produtos.</text>
  <text x="446" y="626" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="19" font-weight="800">FOTOS • PREÇOS • PRAZOS • COMO PEDIR</text>

  <rect x="92" y="686" width="300" height="132" rx="24" fill="#FFFFFF" stroke="${colors.line}"/>
  ${image({ href: responder, x: 106, y: 700, width: 272, height: 104, id: "mini-responder", fit: "meet", radius: 16 })}
  <text x="430" y="732" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="18" font-weight="800">DOCEZAP PREMIUM</text>
  <text x="430" y="774" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="29" font-weight="900">Até 70 sugestões em 30 dias</text>

  <rect x="92" y="842" width="300" height="132" rx="24" fill="#FFFFFF" stroke="${colors.line}"/>
  ${image({ href: combinados, x: 106, y: 856, width: 272, height: 104, id: "mini-combinados", fit: "meet", radius: 16 })}
  <text x="430" y="888" fill="${colors.green}" font-family="Arial, sans-serif" font-size="18" font-weight="800">COMBINADOS DA ENCOMENDA</text>
  <text x="430" y="930" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="29" font-weight="900">Mensagens + checklist do pedido</text>

  <rect x="64" y="1054" width="952" height="104" rx="28" fill="${colors.terracotta}"/>
  <text x="540" y="1118" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="31" font-weight="900">VER O KIT POR R$ 49,90</text>

  <rect x="64" y="1184" width="952" height="92" rx="24" fill="${colors.greenLight}"/>
  <text x="540" y="1221" text-anchor="middle" fill="${colors.green}" font-family="Arial, sans-serif" font-size="20" font-weight="800">GARANTIA DE 7 DIAS</text>
  <text x="540" y="1252" text-anchor="middle" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="20" font-weight="700">O DoceZap fica disponível por 30 dias.</text>
  ${brand(1328)}
${svgClose}
`;

const humanStatic = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="human-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors.cream2}"/>
      <stop offset="100%" stop-color="${colors.cream}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#human-bg)"/>
  <rect x="470" y="0" width="610" height="${H}" fill="url(#human-bg)"/>
  <rect x="470" y="0" width="10" height="${H}" fill="${colors.terracotta}"/>
  <circle cx="1030" cy="90" r="190" fill="${colors.terracottaLight}" opacity="0.45"/>

  <rect x="528" y="64" width="220" height="50" rx="25" fill="${colors.terracotta}"/>
  <text x="638" y="97" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="20" font-weight="800">BASTIDOR REAL</text>

  <text x="528" y="196" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="62" font-weight="900" letter-spacing="-1.4">
    <tspan x="528">ENQUANTO</tspan>
    <tspan x="528" dy="68">VOCÊ PRODUZ,</tspan>
    <tspan x="528" dy="68">O WHATSAPP</tspan>
    <tspan x="528" dy="68">CONTINUA</tspan>
    <tspan x="528" dy="68">CHAMANDO.</tspan>
  </text>

  <text x="528" y="590" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="29" font-weight="600">
    <tspan x="528">O kit organiza o que a cliente</tspan>
    <tspan x="528" dy="39">vê no cardápio e o que você</tspan>
    <tspan x="528" dy="39">confirma durante o pedido.</tspan>
  </text>

  <rect x="528" y="748" width="496" height="92" rx="24" fill="${colors.terracottaLight}"/>
  <text x="558" y="783" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="18" font-weight="800">ANTES DA CONVERSA</text>
  <text x="558" y="818" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="27" font-weight="800">Modelo de cardápio para adaptar</text>

  <rect x="528" y="864" width="496" height="92" rx="24" fill="${colors.greenLight}"/>
  <text x="558" y="899" fill="${colors.green}" font-family="Arial, sans-serif" font-size="18" font-weight="800">DURANTE O PEDIDO</text>
  <text x="558" y="934" fill="${colors.brown}" font-family="Arial, sans-serif" font-size="27" font-weight="800">DoceZap + Combinados</text>

  <text x="528" y="1052" fill="${colors.terracotta}" font-family="Arial, sans-serif" font-size="67" font-weight="900">R$ 49,90</text>
  <text x="528" y="1092" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="20" font-weight="800">KIT COMPLETO • GARANTIA DE 7 DIAS</text>

  <rect x="528" y="1140" width="496" height="92" rx="28" fill="${colors.brown}"/>
  <text x="776" y="1198" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="30" font-weight="900">SAIBA MAIS</text>

  <text x="528" y="1302" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2.2">CHOCOLATE RENDE</text>
</svg>
`;

await mkdir(outputDir, { recursive: true });

const cards = [
  cardOne(true),
  cardTwo,
  cardThree,
  cardFour,
  cardFive,
  cardSix,
];

const cardPaths = [];

const contained = async (path, width, height) =>
  sharp(path)
    .resize(width, height, {
      fit: "contain",
      background: "#FFFFFF",
    })
    .png()
    .toBuffer();

const screenshotComposites = [
  [],
  [],
  [],
  [
    {
      input: await contained(cardapioPath, 590, 740),
      left: 84,
      top: 410,
    },
  ],
  [
    {
      input: await contained(responderPath, 381, 334),
      left: 100,
      top: 386,
    },
    {
      input: await contained(combinadosPath, 381, 334),
      left: 100,
      top: 834,
    },
  ],
  [
    {
      input: await contained(cardapioPath, 272, 186),
      left: 106,
      top: 462,
    },
    {
      input: await contained(responderPath, 272, 104),
      left: 106,
      top: 700,
    },
    {
      input: await contained(combinadosPath, 272, 104),
      left: 106,
      top: 856,
    },
  ],
];

for (let index = 0; index < cards.length; index += 1) {
  const path = join(outputDir, `carrossel-v3-card-${index + 1}.png`);
  const renderer = sharp(Buffer.from(cards[index]));

  if (screenshotComposites[index].length > 0) {
    renderer.composite(screenshotComposites[index]);
  }

  await renderer.png({ compressionLevel: 9 }).toFile(path);
  cardPaths.push(path);
}

await sharp(Buffer.from(cardOne(false)))
  .png({ compressionLevel: 9 })
  .toFile(join(outputDir, "anuncio-estatico-antes-depois.png"));

const humanPhoto = await sharp(humanPhotoPath)
  .resize(470, 1350, {
    fit: "cover",
    position: "center",
  })
  .modulate({
    brightness: 0.96,
    saturation: 0.86,
  })
  .jpeg({ quality: 92 })
  .toBuffer();

await sharp(Buffer.from(humanStatic))
  .composite([
    {
      input: humanPhoto,
      left: 0,
      top: 0,
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(join(outputDir, "anuncio-estatico-bastidor-real.png"));

const previewTiles = await Promise.all(
  cardPaths.map(path =>
    sharp(path)
      .resize(360, 450, { fit: "fill" })
      .png()
      .toBuffer(),
  ),
);

await sharp({
  create: {
    width: 1080,
    height: 900,
    channels: 4,
    background: "#E9DED4",
  },
})
  .composite(
    previewTiles.map((input, index) => ({
      input,
      left: (index % 3) * 360,
      top: Math.floor(index / 3) * 450,
    })),
  )
  .png({ compressionLevel: 9 })
  .toFile(join(outputDir, "carrossel-v3-preview.png"));

console.log(`Criativos gerados em ${outputDir}`);
