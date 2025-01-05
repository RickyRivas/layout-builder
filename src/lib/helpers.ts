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


export function updateStyleRule(selector, property, value) {
    const rules = Array.from(iframeState.stylesheet.cssRules)
    const existingRule = rules.find(rule => rule.selectorText === selector)

    if (existingRule) {
        existingRule.style[property] = value
    } else {
        const ruleText = `${selector} { ${property} : ${value}; }`
        iframeState.stylesheet.insertRule(ruleText, rules.length)
    }
}

export function findMatchingElements(element, selector) {
    const hasIdentifier = element.classList.length > 0 || element.id
    const querySelector = hasIdentifier ? selector : `${element.tagName.toLowerCase()}:not([id]):not([class])`

    return Array.from(iframeState.document.querySelectorAll(querySelector))
}


export function handleMultipleMatches(element, matches) {
    if (matches.length <= 1) return getSelector(element)

    // automatically create new classname
    const newClassName = generateReadableClassName(element)
    element.classList.add(newClassName)
    return `${element.tagName.toLowerCase()}.${newClassName}`
}

export function generateReadableClassName(element) {
    const parent = element.parentElement
    if (!parent) return `${element.tagName.toLowerCase()}-1`

    const similarElements = Array
        .from(parent.children)
        .filter(child => child.tagName === element.tagName)


    // get the index of element in this container
    const index = similarElements.indexOf(element) + 1
    return `${element.tagName.toLowerCase()}-${index}`
}
