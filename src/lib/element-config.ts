type ElementConfig = {
    type: string;
    defaultClass: string;
    textContent?: string;
    allowedChildren?: string[];
    iconPath?: string;
    defaultChildren?: object[];
    defaultProps?: object
}

export const containers: ElementConfig[] = [
    {
        type: 'section',
        defaultClass: 'section',
        allowedChildren: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'button', 'div', 'ul', 'ol'],
        iconPath: '/icons/elements/section.svg'
    },
    {
        type: 'header',
        defaultClass: 'header',
        allowedChildren: ['h1', 'h2', 'nav', 'div', 'button'],
        iconPath: '/icons/elements/header.svg'
    },
    {
        type: 'footer',
        defaultClass: 'footer',
        allowedChildren: ['p', 'nav', 'div', 'button', 'ul'],
        iconPath: '/icons/elements/footer.svg'
    },
    {
        type: 'nav',
        defaultClass: 'nav',
        allowedChildren: ['ul', 'button', 'a'],
        iconPath: '/icons/elements/nav.svg'
    }
];

export const elements: ElementConfig[] = [
    // Headings
    {
        type: 'h1',
        defaultClass: 'heading-1',
        textContent: 'Heading 1',
        iconPath: '/icons/elements/heading-1.svg',
        allowedChildren: [],
    },
    {
        type: 'h2',
        defaultClass: 'heading-2',
        textContent: 'Heading 2',
        iconPath: '/icons/elements/heading-2.svg',
        allowedChildren: [],
    },
    {
        type: 'h3',
        defaultClass: 'heading-3',
        textContent: 'Heading 3',
        iconPath: '/icons/elements/heading-3.svg',
        allowedChildren: [],
    },
    // Text elements
    {
        type: 'p',
        defaultClass: 'paragraph',
        textContent: 'Paragraph text',
        iconPath: '/icons/elements/paragraph.svg',
        allowedChildren: [],
    },
    {
        type: 'span',
        defaultClass: 'text',
        textContent: 'Text span',
        iconPath: '/icons/elements/text.svg',
        allowedChildren: [],
    },
    // Interactive elements
    {
        type: 'button',
        defaultClass: 'btn',
        textContent: 'Button',
        allowedChildren: ['span'],
        iconPath: '/icons/elements/btn.svg'
    },
    {
        type: 'a',
        defaultClass: 'link',
        textContent: 'Link',
        allowedChildren: ['span'],
        iconPath: '/icons/elements/link.svg'
    },
    {
        type: 'img',
        defaultClass: 'default-image',
        iconPath: '/icons/elements/image.svg',
        allowedChildren: [],
        // Using a placeholder service - or you could host your own placeholder
        defaultProps: {
            src: 'https://placehold.co/500x500', // Assuming you have this placeholder API endpoint
            alt: 'Image description'
        }
    },
    // Lists
    {
        type: 'ul',
        defaultClass: 'list',
        allowedChildren: ['li'],
        iconPath: '/icons/elements/list.svg',
        defaultChildren: [
            { type: 'li', defaultClass: 'list-item', textContent: 'List item 1' },
            { type: 'li', defaultClass: 'list-item', textContent: 'List item 2' },
            { type: 'li', defaultClass: 'list-item', textContent: 'List item 3' }
        ]
    },
    {
        type: 'ol',
        defaultClass: 'ordered-list',
        allowedChildren: ['li'],
        iconPath: '/icons/elements/ordered-list.svg',
        defaultChildren: [
            { type: 'li', defaultClass: 'list-item', textContent: 'List item 1' },
            { type: 'li', defaultClass: 'list-item', textContent: 'List item 2' },
            { type: 'li', defaultClass: 'list-item', textContent: 'List item 3' }
        ]
    },
    {
        type: 'li',
        defaultClass: 'list-item',
        textContent: 'List item',
        iconPath: '/icons/elements/list-item.svg',
        allowedChildren: [],
    },
    // Form elements
    {
        type: 'input',
        defaultClass: 'input',
        iconPath: '/icons/elements/input.svg',
        allowedChildren: [],
    },
    {
        type: 'label',
        defaultClass: 'label',
        textContent: 'Label',
        iconPath: '/icons/elements/label.svg',
        allowedChildren: [],
    },
    // non semantic container
    {
        type: 'div',
        defaultClass: 'container',
        allowedChildren: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'button', 'div', 'ul', 'ol', 'a', 'img'],
        iconPath: '/icons/elements/container.svg'
    }
];