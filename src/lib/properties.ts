// props
export const offsetProperties = ['top', 'right', 'bottom', 'left', 'zIndex'];

// values
export const displayValues = ['block', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid'];
export const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'];

// Flex properties
export const flexDirectionValues = ['row', 'row-reverse', 'column', 'column-reverse'];
export const justifyContentValues = ['normal', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
export const alignItemsValues = ['normal', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'];
export const flexWrapValues = ['nowrap', 'wrap', 'wrap-reverse'];

// Grid properties
export const gridTemplateColumnsPresets = [
    { label: '2 columns', value: 'repeat(2, 1fr)' },
    { label: '3 columns', value: 'repeat(3, 1fr)' },
    { label: '4 columns', value: 'repeat(4, 1fr)' }
];
export const gridGapValues = ['0.5rem', '1rem', '1.5rem', '2rem'];
