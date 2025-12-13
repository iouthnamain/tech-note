# Exercise 1: Build a Responsive Layout with CSS3

## Objective
Create a responsive website layout using Flexbox, Grid, and modern CSS3 features.

## Requirements

### Part 1: Flexbox Layout

Create a navigation bar using Flexbox:
- Logo on the left
- Navigation links in the center
- User menu on the right
- Responsive: stack vertically on mobile

### Part 2: CSS Grid Layout

Create a main content area with Grid:
- Header section (full width)
- Sidebar (1/4 width on desktop)
- Main content (3/4 width on desktop)
- Footer (full width)
- Responsive: sidebar below content on mobile

### Part 3: CSS Variables

Define and use CSS variables for:
- Primary and secondary colors
- Font sizes
- Spacing units
- Border radius

### Part 4: Responsive Design

Implement responsive breakpoints:
- Mobile: < 768px
- Tablet: 768px - 992px
- Desktop: > 992px

### Part 5: Modern CSS Features

Use:
- CSS Grid for layout
- Flexbox for component alignment
- CSS Variables for theming
- Media queries for responsiveness
- Transitions and animations
- Pseudo-classes and pseudo-elements

## Starter Code

Create `styles.css`:

```css
:root {
    /* Define your CSS variables here */
}

/* Your styles here */
```

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Your HTML structure here -->
</body>
</html>
```

## Expected Layout

```
┌─────────────────────────────┐
│      Navigation Bar         │
├──────────┬──────────────────┤
│          │                  │
│ Sidebar  │   Main Content   │
│          │                  │
├──────────┴──────────────────┤
│         Footer              │
└─────────────────────────────┘
```

## Testing

1. Test on different screen sizes
2. Verify Flexbox and Grid layouts
3. Check CSS variable usage
4. Test hover and focus states
5. Validate CSS using [CSS Validator](https://jigsaw.w3.org/css-validator/)

## Bonus Challenges

1. Create a dark mode using CSS variables
2. Add smooth scroll behavior
3. Implement a card component with hover effects
4. Create a responsive image gallery
5. Add loading animations

## Solution

Check `solutions/solution-1.css` after attempting the exercise.

