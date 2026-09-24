// Confere a saude do tema:
//  1. toda chave CORES.X usada no app existe nas duas paletas;
//  2. LIGHT e DARK expoem exatamente o mesmo conjunto de chaves;
//  3. nenhum arquivo voltou a importar a paleta estatica dentro de um
//     StyleSheet de modulo (o erro que faz a tela nao trocar de tema).
//   node scripts/check-theme.js
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const root = path.resolve(__dirname, "..");
const src = path.join(root, "src");

function listJs(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listJs(full, out);
    else if (entry.name.endsWith(".js")) out.push(full);
  }
  return out;
}

// le as paletas sem passar por import/export (o arquivo e so dois objetos)
const paletteSrc = fs.readFileSync(path.join(src, "theme", "palettes.js"), "utf8");
const { code } = babel.transformSync(paletteSrc, {
  filename: "palettes.js",
  presets: [require.resolve("babel-preset-expo")],
  babelrc: false,
  configFile: false,
});
const modulo = { exports: {} };
new Function("module", "exports", "require", code)(modulo, modulo.exports, require);
const { LIGHT, DARK } = modulo.exports;

let falhas = 0;

const soLight = Object.keys(LIGHT).filter((k) => !(k in DARK));
const soDark = Object.keys(DARK).filter((k) => !(k in LIGHT));
if (soLight.length || soDark.length) {
  falhas += 1;
  if (soLight.length) console.error(`Chaves so no tema claro: ${soLight.join(", ")}`);
  if (soDark.length) console.error(`Chaves so no tema escuro: ${soDark.join(", ")}`);
}

const usadas = new Map();
for (const file of listJs(src)) {
  const code = fs.readFileSync(file, "utf8");
  for (const m of code.matchAll(/\bCORES\.([A-Za-z_][A-Za-z0-9_]*)/g)) {
    if (!usadas.has(m[1])) usadas.set(m[1], path.relative(root, file));
  }
}

const desconhecidas = [...usadas].filter(([chave]) => !(chave in LIGHT));
if (desconhecidas.length) {
  falhas += 1;
  console.error("\nChaves usadas que nao existem na paleta:");
  for (const [chave, arquivo] of desconhecidas) console.error(`  CORES.${chave}  (${arquivo})`);
}

const estaticos = listJs(src)
  .filter((f) => !f.includes(`${path.sep}theme${path.sep}`))
  .filter((f) => /from "(\.\.\/)+util\/cores"|from "\.\/util\/cores"/.test(fs.readFileSync(f, "utf8")));
if (estaticos.length) {
  falhas += 1;
  console.error("\nArquivos ainda presos na paleta estatica (nao trocam de tema):");
  for (const f of estaticos) console.error(`  ${path.relative(root, f)}`);
}

const naoUsadas = Object.keys(LIGHT).filter(
  (k) => !usadas.has(k) && !["mode", "statusBarStyle", "navigationTheme"].includes(k),
);

console.log(
  falhas
    ? `\n${falhas} problema(s) no tema`
    : `tema ok — ${Object.keys(LIGHT).length} chaves, ${usadas.size} em uso` +
      (naoUsadas.length ? `\n(sem uso hoje: ${naoUsadas.join(", ")})` : ""),
);
process.exit(falhas ? 1 : 0);
