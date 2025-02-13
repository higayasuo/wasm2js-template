const fs = require('fs');
const { execSync } = require('child_process');
const { getZipFileName } = require('./utils');

const packageName = getZipFileName();
const distDir = 'dist';

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Create zip file
execSync(`cd pkg && zip -r ../${distDir}/${packageName}.zip ./*`);