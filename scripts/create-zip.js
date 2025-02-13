import fs from 'fs';
import { execSync } from 'child_process';
import { getZipFileName } from './utils.js';

const packageName = getZipFileName();
const distDir = 'dist';

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Create zip file
execSync(`cd pkg && zip -r ../${distDir}/${packageName}.zip ./*`);