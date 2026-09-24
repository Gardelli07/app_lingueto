// Varre as fabricas de estilo procurando regras que definem `color` e
// `backgroundColor` juntas e mede o contraste das duas cores nos dois temas.
// Serve como rede pra pegar combinacao ilegivel depois de mexer na paleta.
//   node scripts/check-contrast.js [limite]   (limite padrao: 3.0)
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const root = path.resolve(__dirname, "..");
const src = path.join(root, "src");
const LIMITE = Number(process.argv[2] || 3.0);

const paletteSrc = fs.readFileSync(path.join(src, "theme", "palettes.js"), "utf8");
const { code } = babel.transformSync(paletteSrc, {
  filename: "palettes.js",
  presets: [require.resolve("babel-preset-expo")],
  babelrc: false,
  configFile: false,
});
const modulo = { exports: {} };
new Function("module", "exports", "require", code)(modulo, modulo.exports, require);
const PALETAS = { claro: modulo.exports.LIGHT, escuro: modulo.exports.DARK };

function parseCor(valor) {
  if (typeof valor !== "string") return null;
  const hex = valor.trim().match(/^#([0-9a-f]{3,8})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = [...h].map((c) => c + c).join("");
    if (h.length === 4) h = [...h.slice(0, 3)].map((c) => c + c).join("") + h[3] + h[3];
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a };
  }
  const rgba = valor.trim().match(/^rgba?\(([^)]+)\)$/i);
  if (rgba) {
    const p = rgba[1].split(",").map((n) => parseFloat(n));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  return null;
}

// achata uma cor translucida sobre o fundo de tela do tema
function sobre(cor, base) {
  if (cor.a >= 1) return cor;
  return {
    r: cor.r * cor.a + base.r * (1 - cor.a),
    g: cor.g * cor.a + base.g * (1 - cor.a),
    b: cor.b * cor.a + base.b * (1 - cor.a),
    a: 1,
  };
}

function luminancia({ r, g, b }) {
  const f = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contraste(a, b) {
  const [x, y] = [luminancia(a), luminancia(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

function listJs(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listJs(full, out);
    else if (entry.name.endsWith(".js")) out.push(full);
  }
  return out;
}

// extrai o token/literal de uma propriedade de estilo, quando e simples
function valorDe(node) {
  if (node.type === "StringLiteral") return { literal: node.value };
  if (
    node.type === "MemberExpression" &&
    node.object.type === "Identifier" &&
    node.object.name === "CORES" &&
    node.property.type === "Identifier"
  ) {
    return { token: node.property.name };
  }
  return null;
}

function resolver(ref, paleta) {
  if (!ref) return null;
  if (ref.literal) return parseCor(ref.literal);
  const bruto = paleta[ref.token];
  return bruto ? parseCor(bruto) : null;
}

const achados = [];
for (const file of listJs(src)) {
  // as telas Aulas Plus sao escuras de proposito nos dois temas
  if (file.includes(`aulasplus${path.sep}`)) continue;
  const conteudo = fs.readFileSync(file, "utf8");
  let ast;
  try {
    ast = babel.parseSync(conteudo, {
      filename: file, cwd: root,
      presets: [require.resolve("babel-preset-expo")],
      babelrc: false, configFile: false,
    });
  } catch {
    continue;
  }

  babel.traverse(ast, {
    ObjectExpression(caminho) {
      let cor = null;
      let fundo = null;
      for (const prop of caminho.node.properties) {
        if (prop.type !== "ObjectProperty" || prop.key.type !== "Identifier") continue;
        if (prop.key.name === "color") cor = valorDe(prop.value);
        if (prop.key.name === "backgroundColor") fundo = valorDe(prop.value);
      }
      if (!cor || !fundo) return;

      for (const [nomeTema, paleta] of Object.entries(PALETAS)) {
        const base = parseCor(paleta.SCREEN_BG);
        const c = resolver(cor, paleta);
        const f = resolver(fundo, paleta);
        if (!c || !f) continue;
        const razao = contraste(sobre(c, base), sobre(f, base));
        if (razao < LIMITE) {
          achados.push({
            arquivo: path.relative(root, file),
            linha: caminho.node.loc?.start.line ?? 0,
            tema: nomeTema,
            cor: cor.token || cor.literal,
            fundo: fundo.token || fundo.literal,
            razao: razao.toFixed(2),
          });
        }
      }
    },
  });
}

if (!achados.length) {
  console.log(`nenhuma combinacao abaixo de ${LIMITE}:1`);
} else {
  console.log(`${achados.length} combinacao(oes) abaixo de ${LIMITE}:1\n`);
  for (const a of achados) {
    console.log(`${a.arquivo}:${a.linha}  [${a.tema}]  ${a.cor} sobre ${a.fundo} = ${a.razao}:1`);
  }
}
