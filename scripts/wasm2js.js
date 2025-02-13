const fs = require('fs');
const { execSync } = require('child_process');
const { getWasmPackageName } = require('./utils');

const packageName = getWasmPackageName();
const pkgDir = 'pkg';

// Convert wasm to js
execSync(`wasm2js ${pkgDir}/${packageName}_bg.wasm -o ${pkgDir}/${packageName}_bg.wasm.js`);

// Replace wasm import with js import
const jsFile = `${pkgDir}/${packageName}.js`;
const content = fs.readFileSync(jsFile, 'utf8')
  .replace(`${packageName}_bg.wasm`, `${packageName}_bg.wasm.js`);
fs.writeFileSync(jsFile, content);