import path from 'path';
import fs from 'fs';
import toml from '@iarna/toml';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getCargoPath() {
  return path.join(__dirname, '../..', 'Cargo.toml');
}

export function getPackageName() {
  const cargoPath = getCargoPath();
  const cargoContent = fs.readFileSync(cargoPath, 'utf8');
  const cargoData = toml.parse(cargoContent);
  return cargoData.package.name;
}

export function getWasmPackageName() {
  return getPackageName().replace(/-/g, '_');
}

export function getPackageVersion() {
  const cargoPath = getCargoPath();
  const cargoContent = fs.readFileSync(cargoPath, 'utf8');
  const cargoData = toml.parse(cargoContent);
  return cargoData.package.version;
}

export function getZipFileName() {
  const name = getPackageName();
  const version = getPackageVersion();
  return `${name}-${version}`;
}