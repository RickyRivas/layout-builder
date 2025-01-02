export function getSelector(element) {
    let selector = '';
    if (element.id) selector += `#${element.id}`;
    if (element.classList.length > 0) {
        selector += `.${element.classList.value.replaceAll(' ', '.')}`;
    }
    if (!selector) return `${element.tagName.toLowerCase()}`;
    return selector;
}

export function findDefaultPropertyValue(element, property, allValues) {
    return allValues.find(
        (value) => value === getComputedStyle(element)[property]
    );
}