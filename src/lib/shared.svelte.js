import { getSelector, findMatchingElements, handleMultipleMatches, updateStyleRule } from "$lib/helpers"
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

    try {
        const selector = getSelector(selected);

        // find matching elements
        const matchingElements = findMatchingElements(selected, selector)

        // handle mutiple matches
        const finalSelector = handleMultipleMatches(selected, matchingElements)

        // update or create style rule
        updateStyleRule(finalSelector, property, value)

        // update overlay position
        updateGhostPosition()

    } finally {
        iframeState.updating = false
    }
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