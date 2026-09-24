// Parser rapido de sanidade: roda o babel do proprio projeto em cada arquivo
// passado (ou em src/**/*.js) so pra detectar erro de sintaxe.
//   node scripts/check-syntax.js [arquivo ...]
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const root = path.resolve(__dirname, "..");

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
  try {
    babel.parseSync(code, {
      filename: file,
      cwd: root,
      presets: [require.resolve("babel-preset-expo")],
      babelrc: false,
      configFile: false,
    });
  } catch (error) {
    falhas += 1;
    console.error(`\nERRO ${path.relative(root, file)}`);
    console.error(`  ${error.message.split("\n")[0]}`);
  }
}

console.log(`\n${files.length - falhas}/${files.length} arquivos ok`);
process.exit(falhas ? 1 : 0);
