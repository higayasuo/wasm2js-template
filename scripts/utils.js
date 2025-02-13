const path = require('path');
const fs = require('fs');
const toml = require('@iarna/toml');

function getPackageName() {
  const cargoPath = path.join(__dirname, '..', 'Cargo.toml');
  const cargoContent = fs.readFileSync(cargoPath, 'utf8');
  const cargoData = toml.parse(cargoContent);
  return cargoData.package.name;
}

function getWasmPackageName() {
  return getPackageName().replace(/-/g, '_');
}

function getZipFileName() {
  return getPackageName();
}

module.exports = {
  getPackageName,
  getWasmPackageName,
  getZipFileName
};