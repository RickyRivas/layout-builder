export const displayValues = [
    {
        value: 'inline',
        label: 'Inline',
        path: 'M-.004 43.996v-44h5v44h-5Zm39 .004V0h5v44h-5ZM16.408 1.135c.236-.38 1.038-.84 1.72-.998.29-.065 1.997-.118 3.797-.131 2.56-.013 3.467.026 4.058.184.88.236 1.445.59 1.708 1.09.289.565 9.93 40.534 9.93 41.178 0 .735-.329 1.169-1.025 1.379-.801.236-6.107.21-6.935-.04-1.13-.328-1.143-.38-2.023-4.479l-.422-1.962a222.418 222.418 0 0 0-.431-1.991l-.066-.302h-9.536l-.828 3.782c-.46 2.076-.906 3.954-.998 4.177-.105.25-.354.5-.67.657-.46.223-.827.25-3.861.25-2.956 0-3.402-.027-3.77-.237-.591-.315-.749-.67-.657-1.458.119-1.05 9.786-40.77 10.01-41.099Zm9.207 26.007c-.407-1.628-2.928-13.91-3.191-15.564-.407-2.47-.578-2.693-.815-1.051-.289 1.996-.656 3.927-1.983 10.298-.722 3.48-1.313 6.396-1.313 6.475 0 .105 1.037.144 3.69.144h3.691l-.078-.302Z'
    },
    {
        value: 'inline-block',
        label: 'Inline Block',
        path: 'M-.004 43.996v-44h5v44h-5Zm8-4.5v-35h28v35h-28ZM38.996 0v44h5V0h-5Z'
    },
    {
        value: 'block',
        label: 'Block',
        path: 'M0 0h44v5H0V0Zm4.5 8h35v28h-35V8Zm39.496 31h-44v5h44v-5Z'
    },
    {
        value: 'flex',
        label: 'Flex',
        path: 'M4.074 0H0v44h44V0H4.074Zm4.074 35.852V8.148h27.704v27.704H8.148Zm12.26-25.247v22.788H12.26V10.605h8.149Zm11.328 0v22.788h-8.148V10.605h8.148Z'
    },
    {
        value: 'grid',
        label: 'Grid',
        path: 'M20 0H0v20h20V0Zm24 0H24v20h20V0ZM24 24h20v20H24V24Zm-4 0H0v20h20V24Z'
    },
    // {
    //     value: 'none',
    //     label: 'None',
    //     path: 'M.46 0h44v44h-44z'
    // }
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
    // {
    //     value: 'start',
    //     label: 'Start',
    //     path: 'M8 12h28v4H8v-4zm8 8h20v4H16v-4zm8 8h12v4H24v-4z'  // Decreasing lines from left
    // },
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