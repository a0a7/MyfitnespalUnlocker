# MyfitnespalUnlocker Browser Extension

A browser extension that removes premium upgrade prompts and disables blur filters on MyFitnessPal.com, giving you a cleaner browsing experience.

## Features

- 🚫 **Removes Premium Links**: Automatically removes all `<a>` elements with href containing "/premium"
- 👁️ **Disables Blur Filters**: Removes `filter: blur()` CSS effects from all elements on the page
- 🔄 **Dynamic Monitoring**: Continuously monitors for new content and removes premium elements as they appear
- 🌐 **Cross-Browser**: Works on both Chrome and Firefox

## Installation

### Chrome Installation

1. Download or clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build:chrome` to build the Chrome extension
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" in the top right corner
6. Click "Load unpacked" and select the `build/chrome` folder
7. The extension will be automatically active on MyFitnessPal.com

### Firefox Installation

1. Download or clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build:firefox` to build the Firefox extension
4. Open Firefox and navigate to `about:debugging`
5. Click "This Firefox" in the sidebar
6. Click "Load Temporary Add-on" and select the `build/firefox/manifest.json` file
7. The extension will be temporarily installed and active on MyFitnessPal.com

### Building the Extension

This project uses Node.js for building. First install dependencies:

```bash
npm install
```

Then build the extension:

```bash
# Build both Chrome and Firefox versions
npm run build

# Build only Chrome version
npm run build:chrome

# Build only Firefox version
npm run build:firefox

# Clean build directory
npm run clean
```

#### Creating Extension Packages

#### For Chrome (.crx)
1. In Chrome extensions page, click "Pack extension"
2. Select the `build/chrome` folder
3. This will create a .crx file for distribution

#### For Firefox (.xpi)
1. Zip all files from the `build/firefox` folder
2. Change the .zip extension to .xpi
3. You can install the .xpi file in Firefox

## Files Structure

```
MyfitnespalUnlocker/
├── package.json             # Node.js project configuration
├── build.js                 # Node.js build script
├── manifest.json            # Chrome manifest (v3)
├── manifest_v2.json        # Firefox manifest (v2)
├── content.js              # Main functionality script
├── styles.css             # CSS to disable blur filters
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── build/                 # Generated build files
│   ├── chrome/           # Chrome extension build
│   └── firefox/          # Firefox extension build
└── README.md
```

## How It Works

The extension uses a content script that:

1. **Scans for Premium Links**: Finds all `<a>` elements with href containing "/premium" and removes them
2. **Removes Blur Filters**: Scans all elements for CSS `filter: blur()` properties and removes them
3. **Monitors Changes**: Uses MutationObserver to detect when new content is added to the page
4. **Runs Periodically**: Also runs every 2 seconds to catch any missed changes

## Technical Details

- **Content Script Injection**: Runs at `document_start` for maximum effectiveness
- **CSS Override**: Uses `!important` declarations to forcefully remove blur effects
- **Dynamic Content Handling**: Monitors DOM mutations to handle AJAX-loaded content
- **Cross-Browser Compatibility**: Includes manifests for both Chrome (v3) and Firefox (v2)

## Development

To modify the extension:

1. Edit `content.js` for JavaScript functionality
2. Edit `styles.css` for CSS-based blocking
3. Reload the extension in your browser's extension management page

## Legal Notice

This extension is for educational purposes only. Please respect the terms of service of websites you visit and consider supporting services you find valuable.

## License

See LICENSE file for details.
