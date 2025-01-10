import { updateStyleRule } from "$lib/helpers"
export const iframeState = $state({
    document: null,
    stylesheet: null,
    initialized: false,
    src: '/base-frame.html',
    selector: 'data-builder-selected',
    selected: null,
    updating: false,
    selectedPanelIndex: 0
})

export function selectElement(target) {
    if (target === iframeState.document.body) {
        target = iframeState.document.querySelector('section')
    }

    // remove active dataset off currently selected
    const prevSelected = iframeState.document.querySelector(`[${ iframeState.selector }]`)
    if (prevSelected) prevSelected.removeAttribute(iframeState.selector)

    // add active dataset and update state
    iframeState.selected = target
    iframeState.selected.setAttribute(iframeState.selector, true)
}

export function findDefaultPropertyValue(element, property, allowedValues) {
    const computedValue = getComputedStyle(element)[ property ];
    return allowedValues.find(value => value === computedValue) || allowedValues[ 0 ];
}

export function updateIframeStylesheet(property, value) {
    if (!iframeState.selected) return
    iframeState.updating = true

    try {
        // update or create style rule
        updateStyleRule(property, value)
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
        iframeState.stylesheet = iframe.contentDocument.querySelector('#layout-styles').sheet;

        // Add click listeners to all elements
        iframeState.document.body.addEventListener('click', (e) => {
            selectElement(e.target)
            e.preventDefault()
        })

        // select base
        selectElement(iframeState.document.querySelector('section'))

        iframeState.initialized = true;
    });
}

