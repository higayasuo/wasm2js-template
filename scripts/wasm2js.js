import fs from 'fs';
import { execSync } from 'child_process';
import { getWasmPackageName } from './utils.js';

const packageName = getWasmPackageName();
const pkgDir = 'pkg';

// Convert wasm to js
execSync(`wasm2js ${pkgDir}/${packageName}_bg.wasm -o ${pkgDir}/${packageName}_bg.wasm.js`);

// Delete the wasm file as it's no longer needed
fs.unlinkSync(`${pkgDir}/${packageName}_bg.wasm`);

// Replace wasm import with js import
const jsFile = `${pkgDir}/${packageName}.js`;
const content = fs.readFileSync(jsFile, 'utf8')
  .replace(`${packageName}_bg.wasm`, `${packageName}_bg.wasm.js`);
fs.writeFileSync(jsFile, content);