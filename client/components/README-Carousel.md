# 3D Carousel Component

## Overview
The `ModelCarousel.vue` component implements a sophisticated 3D carousel that displays character cards with depth simulation and smooth transitions. This component is based on the 3d-slider-cards implementation and adapted for Vue 3.

## Features

### 🎯 Core Functionality
- **Dynamic card positioning**: Shows up to 5 cards with 3D positioning system
- **Infinite looping**: Seamlessly loops through the card array without visible boundaries
- **3D depth effect**: Cards are arranged with depth simulation using scale, opacity, and z-index
- **Smooth animations**: 500ms transitions with ease-in-out timing

### 🎨 Visual Design
- **Card dimensions**: Fixed `270px × 400px` with `25px` border radius
- **3D positioning**: Cards rotate on Y-axis for enhanced depth perception
- **Dynamic shadows**: Center card has enhanced drop shadow for prominence
- **Blur effects**: Side cards have progressive blur for depth perception

### 📱 Interactions
- **Navigation arrows**: Large, accessible buttons on left and right sides
- **Touch/swipe gestures**: Mobile-friendly swipe detection
- **Hover effects**: Only the center card responds to hover interactions
- **Interactive elements**: Heart (favorite) and info buttons on center card

## Card Positioning System

### Position Mapping
```
Position 1 (Far Left):  scale: 0.8, opacity: 1.0, z-index: 1, rotateY: -2°, blur: 5px
Position 2 (Left):      scale: 0.9, opacity: 1.0, z-index: 2, rotateY: -1°, blur: 2px
Position 3 (Center):    scale: 1.0, opacity: 1.0, z-index: 4, rotateY: 0°, blur: 0px
Position 4 (Right):     scale: 0.9, opacity: 1.0, z-index: 2, rotateY: 1°, blur: 2px
Position 5 (Far Right): scale: 0.8, opacity: 1.0, z-index: 1, rotateY: 2°, blur: 5px
```

### Spacing Configuration
- **Card width**: 270px
- **Card height**: 400px
- **Positioning**: Percentage-based positioning for responsive design
- **Center card**: 50% left position
- **Side cards**: 20%, 35%, 65%, 80% left positions

### Infinite Looping Logic
```javascript
// Position-based indexing with modulo arithmetic
const leftScroll = () => {
  // Decrement all position indices
  if (center.value !== undefined) {
    center.value = center.value - 1
    if (center.value === -1) center.value = props.models.length - 1
  }
  // Similar logic for other positions...
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `models` | Array | required | Array of character objects |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `card-click` | character | Emitted when a card is clicked |
| `toggle-favorite` | characterId | Emitted when favorite button is toggled |

## Data Requirements

Each character object should have:
```javascript
{
  id: string | number,
  name: string,
  age: number,
  bio: string,
  image: string,
  isFavorite: boolean,
  badge?: string // 'NEW' or 'PREMIUM'
}
```

## Usage Example

```vue
<template>
  <ModelCarousel 
    :models="featuredModels" 
    @card-click="handleCardClick"
    @toggle-favorite="handleToggleFavorite"
  />
</template>
```

## Technical Implementation

### Key Algorithms
1. **Position Calculation**: Each card's transform is calculated based on its position (0-4)
2. **Infinite Loop**: Uses modulo arithmetic to create seamless looping
3. **3D Transforms**: Combines translateX, translateY, scale, and rotateY for depth
4. **Touch Detection**: Handles swipe gestures with threshold-based detection

### Performance Optimizations
- `will-change: transform, opacity, filter` for GPU acceleration
- `transform-style: preserve-3d` for proper 3D rendering
- `backface-visibility: hidden` to prevent rendering hidden faces
- Efficient computed properties for reactive updates

### Accessibility Features
- ARIA labels on navigation buttons
- Keyboard navigation support
- Focus-visible styles for better UX
- Touch-friendly interaction areas

## Browser Support
- Modern browsers with CSS 3D transforms support
- Mobile browsers with touch event support
- Graceful degradation for older browsers

## Customization
The carousel can be customized by modifying:
- Card spacing (`spacing` variable)
- Scale factors for each position
- Opacity levels for depth perception
- Animation timing and easing curves
- Background colors and gradients
