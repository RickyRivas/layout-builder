export const displayValues = [
    {
        value: 'inline',
        label: 'Inline',
        path: ''
    },
    {
        value: 'block',
        label: 'Block',
        path: ''
    },
    {
        value: 'inline-block',
        label: 'Inline Block',
        path: ''
    },
    {
        value: 'flex',
        label: 'Flex',
        path: ''
    },
    {
        value: 'inline-flex',
        label: 'Inline Flex',
        path: ''
    },
    {
        value: 'grid',
        label: 'Grid',
        path: ''
    },
    {
        value: 'none',
        label: 'None',
        path: ''
    },
    {
        value: 'inline-grid',
        label: 'Inline Grid',
        path: ''
    }
];

export const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'];

// Flex properties
export const flexDirectionValues = [
    { value: 'row', label: 'Row', path: '' },
    { value: 'row-reverse', label: 'Row Reverse', path: '' },
    { value: 'column', label: 'Column', path: '' },
    { value: 'column-reverse', label: 'Column Reverse', path: '' }
];

export const justifyContentValues = [
    { value: 'normal', label: 'Normal', path: '' },
    { value: 'flex-start', label: 'Start', path: '' },
    { value: 'flex-end', label: 'End', path: '' },
    { value: 'center', label: 'Center', path: '' },
    { value: 'space-between', label: 'Space Between', path: '' },
    { value: 'space-around', label: 'Space Around', path: '' },
    { value: 'space-evenly', label: 'Space Evenly', path: '' }
];

export const alignItemsValues = [
    { value: 'normal', label: 'Normal', path: '' },
    { value: 'flex-start', label: 'Start', path: '' },
    { value: 'flex-end', label: 'End', path: '' },
    { value: 'center', label: 'Center', path: '' },
    { value: 'stretch', label: 'Stretch', path: '' },
    { value: 'baseline', label: 'Baseline', path: '' }
];

export const flexWrapValues = [
    { value: 'nowrap', label: 'No Wrap', path: '' },
    { value: 'wrap', label: 'Wrap', path: '' },
    { value: 'wrap-reverse', label: 'Wrap Reverse', path: '' }
];

// Grid properties
export const gridTemplateColumnsPresets = [
    { value: 'none', label: 'None', path: '' },
    { value: 'repeat(2, 1fr)', label: '2 Columns', path: '' },
    { value: 'repeat(3, 1fr)', label: '3 Columns', path: '' },
    { value: 'repeat(4, 1fr)', label: '4 Columns', path: '' }
];


export const textAlignValues = [
    {
        value: 'start',
        label: 'Start',
        path: 'M8 12h28v4H8v-4zm8 8h20v4H16v-4zm8 8h12v4H24v-4z'  // Decreasing lines from left
    },
    {
        value: 'left',
        label: 'Left',
        path: 'M8 12h28v4H8v-4zm8 8h20v4H8v-4zm8 8h12v4H8v-4z'  // All lines starting from left
    },
    {
        value: 'center',
        label: 'Center',
        path: 'M8 12h28v4H8v-4zm12 8h16v4H12v-4zm16 8h8v4H16v-4z'  // Lines centered
    },
    {
        value: 'right',
        label: 'Right',
        path: 'M8 12h28v4H8v-4zm8 8h20v4H8v-4zm8 8h12v4H24v-4z'  // All lines ending at right
    },
    {
        value: 'justify',
        label: 'Justify',
        path: 'M8 12h28v4H8v-4zm0 8h28v4H8v-4zm0 8h28v4H8v-4z'  // Full width lines
    }
];

export const textTransforms = [
    {
        value: 'none',
        label: 'None',
        path: 'M8 12h28v4H8v-4zm0 8h28v4H8v-4zm0 8h28v4H8v-4z'  // Regular lines
    },
    {
        value: 'capitalize',
        label: 'Capitalize',
        path: 'M8 12h8v8H8v-8zm12 0h16v4H20v-4zm0 8h16v4H20v-4z'  // First letter larger
    },
    {
        value: 'uppercase',
        label: 'Uppercase',
        path: 'M8 10h28v8H8v-8zm0 12h28v8H8v-8z'  // Taller blocks representing caps
    },
    {
        value: 'lowercase',
        label: 'Lowercase',
        path: 'M8 14h28v6H8v-6zm0 10h28v6H8v-6z'  // Shorter blocks for lowercase
    }
];

export const fontStyles = [
    {
        value: 'normal',
        label: 'Normal',
        path: 'M8 12h28v4H8v-4zm8 8h20v4H8v-4zm8 8h12v4H8v-4z'  // Straight lines
    },
    {
        value: 'italic',
        label: 'Italic',
        path: 'M16 12h28l-4 4H12l4-4zm4 8h20l-4 4H16l4-4zm4 8h12l-4 4H20l4-4z'  // Slanted lines
    },
    {
        value: 'oblique',
        label: 'Oblique',
        path: 'M16 12h28l-6 4H10l6-4zm4 8h20l-6 4H14l6-4zm4 8h12l-6 4H18l6-4z'  // More slanted lines
    }
];

export const fontFamilyValues = [
    {
        value: 'Inter',
        label: 'Inter',
    }
]