# wasm2js-template

This template is designed to be used as a subdirectory within a wasm-pack project to convert WebAssembly to JavaScript. It provides a set of scripts to automate the build process and dependency management.

## Overview

The template includes several utility scripts to:
- Convert WebAssembly to JavaScript
- Update Rust dependencies to compatible versions
- Create distributable npm packages

## Scripts

### Package Scripts

```bash
# Clean build artifacts
npm run clean

# Full build process
npm run build

# Build WebAssembly package
npm run build:wasm

# Convert Wasm to JavaScript
npm run wasm2js

# Create npm package
npm run pack

# Start development server
npm run dev

# Update Cargo dependencies
npm run update:cargo-deps
```

### Script Details

#### wasm2js.js
This script converts the WebAssembly module to JavaScript using `wasm2js` tool. It performs the following tasks:
- Converts the `.wasm` file to a JavaScript file
- Updates the module imports to use the JavaScript version instead of WebAssembly
- Updates the package.json files array to include necessary files

#### update-cargo-deps.js
This script manages Rust dependencies in your `Cargo.toml` file:
- Updates `wasm-bindgen` to version 0.2.93
- Updates `js-sys` to version 0.3.67
- Updates `web-sys` to version 0.3.67

These versions are specifically chosen for compatibility with the wasm2js conversion process.

#### pack.js
Creates a distributable npm package containing the converted JavaScript files and related assets using `npm pack`.

## Usage

1. Create a new wasm-pack project
2. Add this template as a subdirectory named `wasm2js`
3. Run the build process:
   ```bash
   cd wasm2js
   npm install
   npm run build
   ```

The build process will:
1. Clean previous build artifacts
2. Build the WebAssembly module
3. Convert it to JavaScript
4. Create a npm package

### Using the Generated Package

The build process creates a `.tgz` file in the `pkg` directory. You can use this package in other projects by adding it to their dependencies in `package.json`:

```json
{
  "dependencies": {
    "your-package-name": "file:path/to/your-package-name-1.0.0.tgz"
  }
}
```

This allows you to directly use the JavaScript version of your WebAssembly module in projects that don't support WebAssembly or where JavaScript is preferred.

## Development

For development purposes, you can use:
```bash
npm run dev
```
This will start a Vite development server for the frontend application.