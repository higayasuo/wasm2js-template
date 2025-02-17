import { execSync } from 'child_process';
import { getWasmPackageName } from './utils.js';

const packageName = getWasmPackageName();

// Create npm package
execSync('cd pkg && npm pack');