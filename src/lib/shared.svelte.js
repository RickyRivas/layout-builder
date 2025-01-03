import { getSelector } from "$lib/helpers"
export const iframeState = $state({
    document: null,
    stylesheet: null,
    initialized: false,
    src: '/base-frame.html',
    selector: 'data-builder-selected',
    selected: null,
    updating: false
})

export function selectElement(target) {
    if (target.tagName === 'BODY') return
    // remove active dataset off currently selected
    const prevSelected = iframeState.document.querySelector(`[${ iframeState.selector }]`)
    if (prevSelected) prevSelected.removeAttribute(iframeState.selector)

    // add active dataset and update state
    iframeState.selected = target
    iframeState.selected.setAttribute(iframeState.selector, true)
}

export function updateIframeStylesheet(selected, property, value) {
    iframeState.updating = true

    let selector = getSelector(selected);
    let hasIdentifier = selected.classList.length > 0 || selected.id;
    const matchingElements = iframeState.document.querySelectorAll(
        hasIdentifier ? selector : `${ selector }:not([id]):not([class])`
    );

    if (matchingElements.length > 1) {
        const applyToAll = prompt(`Apply to all ${ selected.tagName }'s?`);

        if (!applyToAll) {
            const newClassName = `${ selected.tagName.toLowerCase() }-${ matchingElements.length }`;
            selected.classList.add(newClassName);
            selector = '.' + newClassName;
        }
    }

    // update
    const rules = iframeState.stylesheet.cssRules;
    const ruleExistForElement = Array.from(rules).find((rule) => rule.selectorText === selector);

    if (ruleExistForElement) {
        // update
        ruleExistForElement.style[ property ] = value;
    } else {
        // insert
        iframeState.stylesheet.insertRule(`${ selector } { ${ property }: ${ value }; }`, rules.length);
    }

    iframeState.updating = false

    // update position of GhostSelector
    updateGhostPosition()
}

export function updateGhostPosition() {
    const event = new CustomEvent('update-selection-overlay')
    window.dispatchEvent(event)
}

export function initIframe(iframe) {
    iframe.addEventListener('load', () => {
        iframeState.document = iframe.contentDocument;
        iframeState.stylesheet = iframe.contentDocument.querySelector('#base-styles').sheet;

        // Add click listeners to all elements
        iframeState.document.body.addEventListener('click', (e) => {
            selectElement(e.target)
            e.preventDefault()
        })

        iframeState.initialized = true;
    });
}