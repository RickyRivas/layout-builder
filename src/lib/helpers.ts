export function getSelector(element) {
    let selector = element.tagName.toLowerCase()

    if (element.id) {
        return `${selector}#${element.id}`
    }

    if (element.classList.length > 0) {
        selector += `.${Array.from(element.classList).join('.')}`
    }

    return selector;
}

export function findDefaultPropertyValue(element, property, allValues) {
    return allValues.find(
        (value) => value === getComputedStyle(element)[property]
    );
}