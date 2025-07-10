#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  gray: '\x1b[90m'
};

class ExtensionBuilder {
  constructor() {
    this.buildDir = path.join(__dirname, 'build');
    this.chromeDir = path.join(this.buildDir, 'chrome');
    this.firefoxDir = path.join(this.buildDir, 'firefox');
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  // Recursively copy directory
  copyDirectory(src, dest) {
    if (!fs.existsSync(src)) {
      this.log(`Warning: Source directory ${src} does not exist`, 'yellow');
      return;
    }

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);
    
    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      
      if (fs.statSync(srcPath).isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  // Copy a single file
  copyFile(src, dest, newName = null) {
    if (!fs.existsSync(src)) {
      this.log(`Warning: Source file ${src} does not exist`, 'yellow');
      return false;
    }

    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const finalDest = newName ? path.join(destDir, newName) : dest;
    fs.copyFileSync(src, finalDest);
    return true;
  }

  // Clean build directory
  clean() {
    this.log('Cleaning build directory...', 'yellow');
    
    if (fs.existsSync(this.buildDir)) {
      fs.rmSync(this.buildDir, { recursive: true, force: true });
      this.log('Build directory cleaned', 'green');
    } else {
      this.log('Build directory already clean', 'gray');
    }
  }

  // Build Chrome extension
  buildChrome() {
    this.log('Building Chrome extension...', 'green');
    
    // Create Chrome build directory
    if (!fs.existsSync(this.chromeDir)) {
      fs.mkdirSync(this.chromeDir, { recursive: true });
    }

    // Copy files for Chrome
    const files = [
      { src: 'manifest.json', dest: path.join(this.chromeDir, 'manifest.json') },
      { src: 'content.js', dest: path.join(this.chromeDir, 'content.js') },
      { src: 'styles.css', dest: path.join(this.chromeDir, 'styles.css') }
    ];

    let copiedFiles = 0;
    for (const file of files) {
      if (this.copyFile(file.src, file.dest)) {
        copiedFiles++;
      }
    }

    // Copy icons directory
    const iconsDir = path.join(__dirname, 'icons');
    if (fs.existsSync(iconsDir)) {
      this.copyDirectory(iconsDir, path.join(this.chromeDir, 'icons'));
      this.log('Icons directory copied', 'gray');
    } else {
      this.log('Icons directory not found - you may need to add icon files', 'yellow');
    }

    this.log(`Chrome extension built successfully (${copiedFiles} files copied)`, 'cyan');
    this.log(`Location: ${this.chromeDir}`, 'gray');
  }

  // Build Firefox extension
  buildFirefox() {
    this.log('Building Firefox extension...', 'green');
    
    // Create Firefox build directory
    if (!fs.existsSync(this.firefoxDir)) {
      fs.mkdirSync(this.firefoxDir, { recursive: true });
    }

    // Copy files for Firefox (using v2 manifest)
    const files = [
      { src: 'manifest_v2.json', dest: path.join(this.firefoxDir, 'manifest.json') },
      { src: 'content.js', dest: path.join(this.firefoxDir, 'content.js') },
      { src: 'styles.css', dest: path.join(this.firefoxDir, 'styles.css') }
    ];

    let copiedFiles = 0;
    for (const file of files) {
      if (this.copyFile(file.src, file.dest)) {
        copiedFiles++;
      }
    }

    // Copy icons directory
    const iconsDir = path.join(__dirname, 'icons');
    if (fs.existsSync(iconsDir)) {
      this.copyDirectory(iconsDir, path.join(this.firefoxDir, 'icons'));
      this.log('Icons directory copied', 'gray');
    } else {
      this.log('Icons directory not found - you may need to add icon files', 'yellow');
    }

    this.log(`Firefox extension built successfully (${copiedFiles} files copied)`, 'cyan');
    this.log(`Location: ${this.firefoxDir}`, 'gray');
  }

  // Build both extensions
  buildAll() {
    this.log('Building MyfitnespalUnlocker extension...', 'green');
    console.log('');
    
    this.buildChrome();
    console.log('');
    this.buildFirefox();
    console.log('');
    
    this.log('Build complete!', 'green');
    this.showInstallInstructions();
  }

  // Show installation instructions
  showInstallInstructions() {
    console.log('');
    this.log('Installation Instructions:', 'cyan');
    this.log('━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    console.log('');
    this.log('Chrome:', 'yellow');
    this.log('  1. Open chrome://extensions/', 'gray');
    this.log('  2. Enable "Developer mode"', 'gray');
    this.log('  3. Click "Load unpacked"', 'gray');
    this.log(`  4. Select: ${this.chromeDir}`, 'gray');
    console.log('');
    this.log('Firefox:', 'yellow');
    this.log('  1. Open about:debugging', 'gray');
    this.log('  2. Click "This Firefox"', 'gray');
    this.log('  3. Click "Load Temporary Add-on"', 'gray');
    this.log(`  4. Select: ${path.join(this.firefoxDir, 'manifest.json')}`, 'gray');
    console.log('');
  }

  // Show help
  showHelp() {
    console.log('');
    this.log('MyfitnespalUnlocker Build Tool', 'green');
    this.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'green');
    console.log('');
    this.log('Usage:', 'cyan');
    this.log('  npm run build          Build both Chrome and Firefox extensions', 'gray');
    this.log('  npm run build:chrome   Build Chrome extension only', 'gray');
    this.log('  npm run build:firefox  Build Firefox extension only', 'gray');
    this.log('  npm run clean          Clean build directory', 'gray');
    console.log('');
    this.log('Direct node usage:', 'cyan');
    this.log('  node build.js          Build both extensions', 'gray');
    this.log('  node build.js --chrome Build Chrome extension only', 'gray');
    this.log('  node build.js --firefox Build Firefox extension only', 'gray');
    this.log('  node build.js --clean  Clean build directory', 'gray');
    this.log('  node build.js --help   Show this help', 'gray');
    console.log('');
  }
}

// Main execution
function main() {
  const builder = new ExtensionBuilder();
  const args = process.argv.slice(2);

  // Parse command line arguments
  if (args.includes('--help') || args.includes('-h')) {
    builder.showHelp();
    return;
  }

  if (args.includes('--clean')) {
    builder.clean();
    return;
  }

  if (args.includes('--chrome')) {
    builder.buildChrome();
    builder.showInstallInstructions();
    return;
  }

  if (args.includes('--firefox')) {
    builder.buildFirefox();
    builder.showInstallInstructions();
    return;
  }

  // Default: build all
  builder.buildAll();
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = ExtensionBuilder;
