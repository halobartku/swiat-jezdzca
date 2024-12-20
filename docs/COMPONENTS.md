# Component API Documentation

This document provides detailed API documentation for each component in the Świat Jeźdźca website.

## Navigation Component

`Navigation.tsx` - Main navigation component that handles site-wide navigation and section tracking.

### Props
```typescript
interface NavItem {
  id: number;
  title: string;
  icon: LucideIcon;
}

interface NavigationProps {
  sections: NavItem[];
  currentSection: number;
  onNavigate: (index: number) => void;
}
```

### Usage
```tsx
<Navigation 
  sections={[
    { id: 0, title: 'Strona Główna', icon: HomeIcon },
    { id: 1, title: 'Produkty', icon: CircleUser }
  ]}
  currentSection={0}
  onNavigate={(index) => {}}
/>
```

## BackgroundAnimations Component

`BackgroundAnimations.tsx` - Creates subtle background animations.

### Usage
```tsx
<BackgroundAnimations />
```

## Home Component

`Home.tsx` - Landing page with hero section and feature highlights.

### Props
```typescript
interface HeroProps {
  onDiscoverClick: () => void;
  onContactClick: () => void;
}
```

### Features
- Hero section with main message
- Feature grid with icons and descriptions
- Video showcase with overlay
- Gradient buttons with hover effects
- Responsive design

### Styling
- Gradient buttons:
  - "Zobacz Produkty": red to white gradient
  - "Zapytaj o Ofertę": white to red gradient
- Rounded-full button design
- Shadow effects with hover states
- Focus rings for accessibility
- Consistent spacing and typography

### Usage
```tsx
<Home 
  onDiscoverClick={() => scrollToSection(1)}
  onContactClick={() => scrollToSection(5)}
/>
```

## Products Component

`Products.tsx` - Displays product categories with interactive image galleries.

### Implementation
```typescript
interface Product {
  icon: LucideIcon;
  title: string;
  imagePath: string;
  images: string[];
}
```

### Usage
```tsx
<Products />
```

## RequestOffer Component

`RequestOffer.tsx` - Contact form for product inquiries with background image and multiple choice selection.

### Features
- Form validation
- Multiple product type selection
- Background image with overlay
- Native email client integration
- Success feedback with dismissible popup
- Responsive design

### Implementation
```typescript
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  productTypes: string[];
}

const productTypeOptions = {
  training: 'Przeszkody Treningowe',
  competition: 'Przeszkody Turniejowe',
  sponsor: 'Przeszkody Sponsorskie',
  accessories: 'Akcesoria',
  other: 'Inne'
};
```

### Styling
- Uses McDonald Świat Jeźdźca image as background
- Semi-transparent black overlay with backdrop blur
- Semi-transparent white input backgrounds (90% opacity)
- White text for labels with dark text for inputs
- Gradient button with hover effects
- Consistent spacing and typography

### Usage
```tsx
<RequestOffer />
```

## HorseshoeCollector Component

`HorseshoeCollector.tsx` - Interactive game element for collecting horseshoes.

### Props
```typescript
interface HorseshoeCollectorProps {
  horseshoesCollected: number;
}
```

### Features
- Horseshoe collection tracking
- Progress visualization
- Equestrian facts unlocking
- Discount code generation
- Rank system

### Usage
```tsx
<HorseshoeCollector horseshoesCollected={150} />
```

## HorseshoeSpawner Component

`HorseshoeSpawner.tsx` - Generates collectible horseshoes across the page.

### Usage
```tsx
<HorseshoeSpawner />
```

## PrivacyPreferences Component

`PrivacyPreferences.tsx` - GDPR-compliant privacy and cookie preferences management.

### Props
```typescript
interface PrivacyPreferencesProps {
  onClose: () => void;
}
```

### Features
- Granular control over different types of cookies
- Persistent preferences storage
- Ad-blocker friendly implementation
- Accessible UI with proper ARIA attributes

### Usage
```tsx
<PrivacyPreferences onClose={() => setShowPrivacyPreferences(false)} />
```

## MouseAnimations Component

`MouseAnimations.tsx` - Cursor-following animations.

### Props
```typescript
interface MouseAnimationsProps {
  mousePosition: {
    x: number;
    y: number;
  };
}
```

### Usage
```tsx
<MouseAnimations mousePosition={mousePosition} />
```

## Footer Component

`Footer.tsx` - Site-wide footer with navigation and contact information.

### Usage
```tsx
<Footer />
```

## Custom Hooks

### HorseshoeInfoPopup Component

`HorseshoeInfoPopup.tsx` - Initial popup that explains the horseshoe collection game.

### Features
- One-time display on first visit
- Game activation/deactivation options
- Animated transitions
- Responsive design
- Persistent user preference storage

### Usage
```tsx
<HorseshoeInfoPopup />
```

### useHorseshoe

Custom hook for managing the horseshoe collection game state.

```typescript
const {
  horseshoesCollected,
  spawnEnabled,
  mousePosition,
  handleMouseMove,
  collectHorseshoe,
  toggleSpawn,
  disableSpawn
} = useHorseshoe()
```

#### Returns
- `horseshoesCollected`: Total horseshoes collected
- `spawnEnabled`: Whether horseshoe spawning is enabled
- `mousePosition`: Current mouse coordinates
- `handleMouseMove`: Mouse movement handler
- `collectHorseshoe`: Collection handler
- `toggleSpawn`: Toggle spawning on/off
- `disableSpawn`: Disable horseshoe spawning

## Utility Components

### SEO Component

`SEO.tsx` - Handles meta tags and SEO optimization.

### Props
```typescript
interface SEOProps {
  title: string;
  description: string;
}
```

### Usage
```tsx
<SEO 
  title="Świat Jeźdźca - Profesjonalny Sprzęt Jeździecki"
  description="Producent profesjonalnego sprzętu jeździeckiego..."
/>
```

## Best Practices

1. **Component Organization**
   - Keep components focused and single-responsibility
   - Use TypeScript interfaces for props
   - Implement proper error boundaries
   - Handle loading and error states

2. **Performance**
   - Memoize callbacks with useCallback
   - Memoize expensive computations with useMemo
   - Use React.memo for pure components
   - Implement proper cleanup in useEffect

3. **Accessibility**
   - Use semantic HTML elements
   - Implement proper ARIA attributes
   - Ensure keyboard navigation
   - Maintain proper color contrast

4. **State Management**
   - Keep state as local as possible
   - Use context for shared state
   - Implement proper state updates
   - Handle side effects properly

5. **Styling Patterns**
   - Use consistent gradient patterns for buttons
   - Implement proper hover and focus states
   - Maintain consistent spacing and typography
   - Use semi-transparent overlays for readability
   - Follow mobile-first responsive design
