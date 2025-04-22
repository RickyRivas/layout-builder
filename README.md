# Layout Builder

A visual interface for building and editing layouts directly in the browser. Built with Svelte 5. Also a HTML & CSS Generator.

## Features
- Drag and drop interface for adding and arranging elements
- Real-time style editing 
- Parent/child relationship validation
- Visual indicators for drag targets
- Customizable spacing and sizing controls
- Support for common HTML elements (headings, paragraphs, containers, etc.)
- One-click code preview with HTML output
- Dark/Light mode theme switching with cookie persistence

## Components
### Elements Panel
- Library of available HTML elements
- Drag and drop or click to add elements
- Validates parent/child relationships

### Properties Panel
- Style controls for selected element
- Unit inputs with validation
- Margin and padding controls
- Size and positioning controls

### Header Controls
- Toggle dark/light mode with cookie storage
- Preview button to view generated HTML & CSS
- Visual mode for returning to builder interface

### Core Features
- Selection overlay for active element
- Hover overlay for element identification
- Drop indicator for drag operations
- Double-click text editing
- Element tree navigation
- Live code preview
- Theme persistence via cookies

## Technology
- Built with Svelte 5 and its new runes system
- Uses iframe for isolated layout rendering
- CSSOM for real-time style management
- Native drag and drop API
- Cookie storage for theme preferences
- No Tailwind, I enjoy writing CSS/LESS
