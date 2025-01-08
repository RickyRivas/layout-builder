import { iframeState } from "./shared.svelte";

export function getElementSelector(element = iframeState.selected) {
    if (!element) return '';

    let selector = '';

    // Only add tag name if:
    // 1. No identifiers exist, or
    // 2. Same class exists on different tag types
    if (element.className) {
        const sameClassElements = Array.from(
            iframeState.document.querySelectorAll(`.${element.className}`)
        )

        const hasSameClassDifferentTag = sameClassElements.some(el => {
            el.className === element.className && el.tagName !== element.tagName
        })

        if (hasSameClassDifferentTag) {
            selector = element.tagName.toLowerCase()
            selector += `.${element.className}`
        } else {
            selector = `.${element.className}`
        }
    } else {
        selector = element.tagName.toLowerCase()
    }

    if (element.id) {
        selector = `#${element.id}`
    }

    return selector;
}

// returns #spot00 .mod .spotbtn
export function getParentPath(element = iframeState.selected) {
    if (!element) return '';

    let parts = []
    let current = element.parentElement;

    // build path from element up to body
    while (current && current !== iframeState.document.body) {
        let part = ''

        // if element has ID or classes, dont include tag name
        if (current.id) {
            part = `#${current.id}`
        } else if (current.classList.length) {
            part = `.${Array.from(current.classList).join('.')}`
        } else {
            // only use tag name if no identifiers exist
            part = current.tagName.toLowerCase()
        }

        parts.unshift(part);
        current = current.parentElement
    }

    return parts.join(' ')
}

export function generateClassName() {
    const element = iframeState.selected
    if (!element) return

    // getParentPath() always uses iframeState.selected
    let parentPath = getParentPath();

    const similarElements = Array.from(element.parentElement.children)
        .filter(child => child.tagName === element.tagName && getParentPath(child) === parentPath)

    // get the index of element in this container
    const index = similarElements.indexOf(element) + 1
    return `${element.tagName.toLowerCase()}-${index}`
}

export function getSelectorForStyle() {
    const element = iframeState.selected
    if (!element) return '';

    // get base selector
    const selector = getElementSelector();
    const parentPath = getParentPath()
    const fullSelector = parentPath ? `${parentPath} ${selector}` : selector

    // return full path for unique elements
    return fullSelector
}


export function updateStyleRule(property, value) {
    const selector = getSelectorForStyle();
    const rules = Array.from(iframeState.stylesheet.cssRules);

    const existingRule = rules.find(rule => rule.selectorText === selector);

    if (existingRule) {
        existingRule.style[property] = value;
    } else {
        const ruleText = `${selector} { ${property} : ${value}; }`;
        iframeState.stylesheet.insertRule(ruleText, rules.length);
    }
}

export function generateUnformattedCss() {
    if (!iframeState.stylesheet) return '';

    const rules = Array.from(iframeState.stylesheet.cssRules);
    let cssContent = '';

    rules.forEach(rule => {
        cssContent += `${rule.selectorText} { ${rule.style.cssText} }\n`;
    });

    console.log('generating', cssContent)
    return cssContent;
}


// reuseable prop handlers
export function findExistingStyleRule(selector) {
    const rules = Array.from(iframeState.stylesheet.cssRules);

    const foundRule = rules.find(rule => {
        // Check rule type (1 is STYLE_RULE) and selector match
        return rule.type === 1 && rule.selectorText === selector;
    });

    return foundRule;
}

// only return values that exist in the stylesheet rules, 
// and ignore computed values if they weren't explicitly set
export function getPropertyValue(propertyName, defaultValue = '', useComputed = false) {
    if (!iframeState.selected || iframeState.updating) {
        return defaultValue;
    }

    const selector = getSelectorForStyle();
    const existingRule = findExistingStyleRule(selector);

    if (existingRule && existingRule.style[propertyName]) {
        return existingRule.style[propertyName];
    }

    // Use computed style for properties that need their element defaults
    if (useComputed) {
        return getComputedStyle(iframeState.selected)[propertyName];
    }

    return defaultValue;
}