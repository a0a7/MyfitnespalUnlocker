// MyfitnespalUnlocker Content Script
// Removes premium links and disables blur filters on MyFitnessPal

(function() {
    'use strict';

    console.log('MyfitnespalUnlocker: Content script loaded');

    // Function to remove premium links
    function removePremiumLinks() {
        // Find all <a> elements with href containing "/premium"
        const premiumLinks = document.querySelectorAll('a[href*="/premium"]');
        
        premiumLinks.forEach(link => {
            console.log('MyfitnespalUnlocker: Removing premium link:', link.href);
            link.remove();
        });
        
        return premiumLinks.length;
    }

    // Function to disable blur filters
    function disableBlurFilters() {
        // Get all elements on the page
        const allElements = document.querySelectorAll('*');
        let blurCount = 0;
        
        allElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const filter = computedStyle.filter;
            
            // Check if the element has a blur filter
            if (filter && filter.includes('blur(')) {
                // Remove the blur filter while preserving other filters
                const newFilter = filter.replace(/blur\([^)]+\)/g, '').replace(/\s+/g, ' ').trim();
                element.style.filter = newFilter || 'none';
                blurCount++;
                console.log('MyfitnespalUnlocker: Removed blur filter from element:', element);
            }
        });
        
        return blurCount;
    }

    // Function to run all unlocking operations
    function runUnlocker() {
        const removedLinks = removePremiumLinks();
        const removedBlurs = disableBlurFilters();
        
        if (removedLinks > 0 || removedBlurs > 0) {
            console.log(`MyfitnespalUnlocker: Removed ${removedLinks} premium links and ${removedBlurs} blur filters`);
        }
    }

    // Run immediately when script loads
    runUnlocker();

    // Run when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runUnlocker);
    }

    // Create a mutation observer to handle dynamic content
    const observer = new MutationObserver(function(mutations) {
        let shouldRun = false;
        
        mutations.forEach(function(mutation) {
            // Check if new nodes were added
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldRun = true;
            }
            
            // Check if attributes were modified (style changes)
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                shouldRun = true;
            }
        });
        
        if (shouldRun) {
            // Use a small delay to batch multiple mutations
            setTimeout(runUnlocker, 100);
        }
    });

    // Start observing the document
    observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'href']
    });

    // Also run periodically to catch any missed changes
    setInterval(runUnlocker, 2000);

    console.log('MyfitnespalUnlocker: Setup complete, monitoring for premium content...');
})();
