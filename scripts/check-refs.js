// Procura identificadores usados sem estar declarados/importados no arquivo
// (o erro tipico ao migrar telas para o tema: sobrou um `styles.x` ou
// `CORES.x` fora do componente que tem o hook).
//   node scripts/check-refs.js [arquivo ...]
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const root = path.resolve(__dirname, "..");

const GLOBAIS = new Set([
  "console", "require", "module", "exports", "process", "global", "globalThis",
  "setTimeout", "clearTimeout", "setInterval", "clearInterval", "requestAnimationFrame",
  "cancelAnimationFrame", "fetch", "FormData", "Promise", "Math", "Date", "JSON",
  "Object", "Array", "String", "Number", "Boolean", "Set", "Map", "WeakMap", "WeakSet",
  "Error", "RegExp", "Symbol", "Intl", "parseInt", "parseFloat", "isNaN", "isFinite",
  "encodeURIComponent", "decodeURIComponent", "AbortController", "__DEV__", "URL",
  "TextEncoder", "TextDecoder", "Infinity", "NaN", "undefined", "Blob", "atob", "btoa",
]);

function listJs(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listJs(full, out);
    else if (entry.name.endsWith(".js")) out.push(full);
  }
  return out;
}

const args = process.argv.slice(2);
const files = args.length
  ? args.map((f) => path.resolve(root, f))
  : [...listJs(path.join(root, "src")), path.join(root, "App.js")];

let falhas = 0;
for (const file of files) {
  const code = fs.readFileSync(file, "utf8");
  let ast;
  try {
    ast = babel.parseSync(code, {
      filename: file,
      cwd: root,
      presets: [require.resolve("babel-preset-expo")],
      babelrc: false,
      configFile: false,
    });
  } catch (error) {
    falhas += 1;
    console.error(`ERRO DE SINTAXE ${path.relative(root, file)}: ${error.message.split("\n")[0]}`);
    continue;
  }

  const soltos = new Map();
  babel.traverse(ast, {
    ReferencedIdentifier(caminho) {
      const nome = caminho.node.name;
      if (GLOBAIS.has(nome)) return;
      if (caminho.scope.hasBinding(nome, { noGlobals: true })) return;
      if (!soltos.has(nome)) soltos.set(nome, caminho.node.loc?.start.line ?? 0);
    },
  });

  if (soltos.size) {
    falhas += 1;
    console.error(`\n${path.relative(root, file)}`);
    for (const [nome, linha] of soltos) console.error(`  linha ${linha}: ${nome}`);
  }
}

console.log(`\n${files.length - falhas}/${files.length} arquivos sem referencia solta`);
process.exit(falhas ? 1 : 0);
