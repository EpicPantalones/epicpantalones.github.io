# Base2Tone Lavender Dark - Color Reference

## Quick Color Guide

### Background Layers
```
█ #1b1726  base-bg           - Page background
█ #221d30  base-bg-alt       - Content areas
█ #2d2640  base-surface      - Elevated cards
█ #3a304f  base-surface-alt  - Borders, dividers
```

### Text Colors
```
█ #635786  base-subtle       - Disabled, subtle text
█ #8c7faa  base-muted        - Secondary text, comments
█ #dad5e8  base-text         - Primary text
█ #f0ecf9  base-text-bright  - Headings, emphasis
```

### Lavender Accents (Primary)
```
█ #8671b3  lavender-dark     - Dark accents
█ #a594d1  lavender          - Primary buttons, links
█ #c5b9e3  lavender-light    - Link hover, highlights
█ #e3ddf4  lavender-pale     - Bright highlights
```

### Sage Accents (Complementary)
```
█ #87a995  sage-dark         - Dark green accents
█ #a5c5b3  sage              - Success states
█ #c1dccf  sage-light        - Code strings, success light
█ #ddeee5  sage-pale         - Pale green highlights
```

### Status Colors
```
█ #d4a574  warning-color     - Warnings
█ #d48297  danger-color      - Errors, danger
```

## Usage Examples

### Headings
- H1: `#e3ddf4` (lavender-pale)
- H2: `#c5b9e3` (lavender-light)
- H3-H6: `#c5b9e3` (lavender-light)

### Interactive Elements
- Links: `#c5b9e3` → hover: `#f0ecf9`
- Buttons: Gradient from `#a594d1` to `#8671b3`
- Button hover: Gradient from `#c5b9e3` to `#a594d1`

### Borders & Dividers
- Subtle borders: `#3a304f` (base-surface-alt)
- Accent borders: `#8671b3` (lavender-dark)
- Strong borders: `#a594d1` (lavender)

### Shadows
- Default: `0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)`
- Hover: `0 8px 12px rgba(165, 148, 209, 0.15), 0 4px 8px rgba(0, 0, 0, 0.3)`

### Code Syntax Highlighting
- Keywords: Lavender shades (`#c5b9e3`, `#a594d1`)
- Strings: Sage shades (`#c1dccf`, `#a5c5b3`)
- Comments: Muted (`#8c7faa`)
- Operators: Lavender (`#a594d1`)
- Functions: Lavender light (`#c5b9e3`)

## Design Principles

### Contrast Ratios
- Body text to background: > 7:1 (AAA)
- Heading text to background: > 7:1 (AAA)
- Link text to background: > 4.5:1 (AA)

### Hierarchy
1. Brightest: `#f0ecf9` - Most important text
2. Bright: `#e3ddf4` - Headings
3. Normal: `#dad5e8` - Body text
4. Muted: `#8c7faa` - Secondary info
5. Subtle: `#635786` - Least important

### Layering
1. Base: `#1b1726` - Page foundation
2. Layer 1: `#221d30` - Content background
3. Layer 2: `#2d2640` - Cards, modals
4. Layer 3: `#3a304f` - Elevated elements

### Interaction States
- Default: Base colors
- Hover: Lighter lavender shades
- Active: Gradient with lavender
- Focus: Lavender glow effect
- Disabled: Subtle/muted colors

## Testing
- Test in both light and dark room conditions
- Verify contrast with browser dev tools
- Check color blindness accessibility
- Test on different displays

## Inspiration
Based on Base2Tone color system by Bram de Haan
- https://base2tone.github.io/
- Lavender variant optimized for dark theme
- Complementary sage tones for variety
