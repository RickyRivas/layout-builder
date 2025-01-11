import { updateStyleRule } from "$lib/helpers"
export const iframeState = $state({
    document: null,
    stylesheet: null,
    initialized: false,
    src: '/base-frame.html',
    selector: 'data-builder-selected',
    selected: null,
    updating: false,
    selectedPanelIndex: 0,
    showMobilePanel: false,
    showCodeModal: false
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

        iframeState.document.addEventListener('dblclick', handleDoubleClick);

        iframeState.initialized = true;
    });
}

function handleDoubleClick(e) {
    const target = e.target;

    // Array of elements that can be content editable
    const editableElements = [ 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI' ];

    if (editableElements.includes(target.tagName)) {
        target.contentEditable = 'true';
        target.focus();

        // Set cursor to end of text
        const range = document.createRange();
        range.selectNodeContents(target);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // Handle enter to save
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                target.blur();
            }
        };

        // Handle losing focus
        const handleBlur = () => {
            target.contentEditable = 'false';
            target.removeEventListener('keydown', handleKeyDown);
            target.removeEventListener('blur', handleBlur);
        };

        target.addEventListener('keydown', handleKeyDown);
        target.addEventListener('blur', handleBlur);
    }
}