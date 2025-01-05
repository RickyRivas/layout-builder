import { iframeState } from "./shared.svelte";

export function getSelector(element) {
    let selector = element.tagName.toLowerCase()

    if (element.id) {
        return `${selector}#${element.id}`
    }

    if (element.classList.length > 0) {
        selector += `.${Array.from(element.classList).join('.')}`
    }

    // If the element has no unique identifiers, we can add nth-child
    // to make it more specific
    // if (!element.id && element.classList.length === 0) {
    //     const parent = element.parentElement;
    //     if (parent) {
    //         const siblings = Array.from(parent.children);
    //         const index = siblings.indexOf(element) + 1;
    //         selector += `:nth-child(${index})`;
    //     }
    // }

    return selector;
}

export function getFullSelector(element) {
    let parts = []
    let current = element

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

export function updateStyleRule(selector, property, value) {
    const rules = Array.from(iframeState.stylesheet.cssRules)
    const existingRule = rules.find(rule => {
        // compare using the full selector path
        const fullSelector = getFullSelector(iframeState.selected)
        return rule.selectorText === fullSelector
    })

    if (existingRule) {
        existingRule.style[property] = value
    } else {
        const fullSelector = getFullSelector(iframeState.selected);
        const ruleText = `${fullSelector} { ${property} : ${value}; }`
        iframeState.stylesheet.insertRule(ruleText, rules.length)
    }
}

export function findMatchingElements(element, selector) {
    const hasIdentifier = element.classList.length > 0 || element.id
    const querySelector = hasIdentifier ? selector : `${element.tagName.toLowerCase()}:not([id]):not([class])`

    const matches = Array.from(iframeState.document.querySelectorAll(querySelector))

    // Filter matches to only include elements with same tag AND classes
    return matches.filter(match =>
        match.tagName === element.tagName &&
        match.className === element.className
    );
}


export function handleMultipleMatches(element, matches) {
    if (matches.length <= 1) return getFullSelector(element)

    // get matching elements that share both tag name and classes
    const trueMatches = matches.filter(match =>
        match.tagName === element.tagName && match.className === element.className
    )

    // if this is the only element of its exact type, no need for additional classes
    if (trueMatches.length <= 1) {
        return getFullSelector(element)
    }

    // otherwise, add the generated class
    const newClassName = generateReadableClassName(element)
    element.classList.add(newClassName)
    return getFullSelector(element)
}

export function generateReadableClassName(element) {
    const parent = element.parentElement
    if (!parent) return `${element.tagName.toLowerCase()}-1`

    // get the full parent path for this element
    let parentPath = '';
    let current = parent

    while (current && current !== iframeState.document.body) {
        let part = current.tagName.toLowerCase()
        if (current.id) {
            part = `#${current.id}`;
        } else if (current.classList.length) {
            part = `.${Array.from(current.classList).join('.')}`
        }
        parentPath = part + ' ' + parentPath
        current = current.parentElement
    }

    // find elements that share the same parent path
    const similarElements = Array
        .from(parent.children)
        .filter(child => {
            if (child.tagName !== element.tagName) return false

            // check if this element has the same parent path
            let childPath = '';
            let currentParent = child.parentElement;
            while (currentParent && currentParent !== iframeState.document.body) {
                let part = currentParent.tagName.toLowerCase()
                if (currentParent.id) {
                    part = `#${currentParent.id}`;
                } else if (currentParent.classList.length) {
                    part = `.${Array.from(currentParent.classList).join('.')}`
                }
                childPath = part + ' ' + childPath
                currentParent = currentParent.parentElement
            }
            return childPath === parentPath
        })


    // get the index of element in this container
    const index = similarElements.indexOf(element) + 1
    return `${element.tagName.toLowerCase()}-${index}`
}


export function generateUnformattedCss() {
    if (!iframeState.stylesheet) return '';

    const rules = Array.from(iframeState.stylesheet.cssRules);
    let cssContent = '';

    rules.forEach(rule => {
        console.log(rule)
        cssContent += `${rule.selectorText} { ${rule.style.cssText} }\n`;
    });

    console.log('generating', cssContent)
    return cssContent;
}