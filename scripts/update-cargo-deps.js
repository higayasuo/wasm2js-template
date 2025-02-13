import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';
import { fileURLToPath } from 'url';
import { getCargoPath } from './utils.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function updateWasmDeps() {
  const cargoPath = getCargoPath();
  const cargoContent = fs.readFileSync(cargoPath, 'utf8');
  const cargoData = toml.parse(cargoContent);

  const deps = cargoData.dependencies;
  let updated = false;

  if (deps['wasm-bindgen']) {
    if (typeof deps['wasm-bindgen'] === 'string') {
      deps['wasm-bindgen'] = '=0.2.93';
      updated = true;
    } else if (typeof deps['wasm-bindgen'] === 'object') {
      deps['wasm-bindgen'] = { ...deps['wasm-bindgen'], version: '=0.2.93' };
      updated = true;
    }
  }

  if (deps['js-sys']) {
    if (typeof deps['js-sys'] === 'string') {
      deps['js-sys'] = '0.3.67';
      updated = true;
    } else if (typeof deps['js-sys'] === 'object') {
      deps['js-sys'] = { ...deps['js-sys'], version: '0.3.67' };
      updated = true;
    }
  }

  if (deps['web-sys']) {
    if (typeof deps['web-sys'] === 'string') {
      deps['web-sys'] = '0.3.67';
      updated = true;
    } else if (typeof deps['web-sys'] === 'object') {
      deps['web-sys'] = { ...deps['web-sys'], version: '0.3.67' };
      updated = true;
    }
  }

  if (updated) {
    const updatedContent = toml.stringify(cargoData)
      .split('\n')
      .map(line => line.trimStart())
      .join('\n');
    fs.writeFileSync(cargoPath, updatedContent);
    console.log('Successfully updated Wasm-related dependencies');
  } else {
    console.log('No dependencies found to update');
  }
}

updateWasmDeps().catch(console.error);