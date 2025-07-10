# Installation Guide

## Prerequisites

Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

## Quick Setup

### Step 1: Build the Extension
```bash
# Install dependencies
npm install

# Build both Chrome and Firefox versions
npm run build
```

### Step 2: Install in Browser

#### For Chrome:
1. Open Chrome
2. Go to `chrome://extensions/`
3. Turn on "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `build/chrome` folder
6. Visit myfitnesspal.com to see it in action!

#### For Firefox:
1. Open Firefox
2. Go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `build/firefox/manifest.json` file
6. Visit myfitnesspal.com to see it in action!

## Build Options

```bash
npm run build          # Build both Chrome and Firefox
npm run build:chrome   # Build Chrome only
npm run build:firefox  # Build Firefox only
npm run clean          # Clean build directory
```

## What the Extension Does

- **Removes Premium Links**: Any link containing "/premium" in the href is automatically removed
- **Disables Blur Effects**: All `filter: blur()` CSS effects are disabled site-wide
- **Works Dynamically**: Monitors the page for changes and applies fixes in real-time

## Note About Icons

The extension requires icon files in the `icons/` folder:
- icon16.png (16x16 pixels)
- icon32.png (32x32 pixels)
- icon48.png (48x48 pixels)
- icon128.png (128x128 pixels)

You can create simple icons or use online generators. A simple design with "MFU" text works well.
