import fs from 'fs';
import { execSync } from 'child_process';
import { getWasmPackageName } from './utils.js';

const packageName = getWasmPackageName();
const pkgDir = 'pkg';

// Convert wasm to js
execSync(`wasm2js ${pkgDir}/${packageName}_bg.wasm -o ${pkgDir}/${packageName}_bg.wasm.js`);

// Delete the wasm file as it's no longer needed
fs.unlinkSync(`${pkgDir}/${packageName}_bg.wasm`);

// Replace wasm import with js import in .js file
const jsFile = `${pkgDir}/${packageName}.js`;
const content = fs.readFileSync(jsFile, 'utf8')
  .replace(`${packageName}_bg.wasm`, `${packageName}_bg.wasm.js`);
fs.writeFileSync(jsFile, content);

// Replace wasm import with js import in package.json
const packageJsonPath = `${pkgDir}/package.json`;
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
packageJson.files = packageJson.files.map(file =>
  file === `${packageName}_bg.wasm` ? `${packageName}_bg.wasm.js` : file
);
// Add _bg.wasm.d.ts to files array if not already present
if (!packageJson.files.includes(`${packageName}_bg.wasm.d.ts`)) {
  packageJson.files.push(`${packageName}_bg.wasm.d.ts`);
}
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));