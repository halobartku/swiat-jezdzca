# Świat Jeźdźca Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Documentation](#component-documentation)
3. [State Management](#state-management)
4. [Animation System](#animation-system)
5. [Development Workflow](#development-workflow)
6. [Performance Considerations](#performance-considerations)

## Architecture Overview

The Świat Jeźdźca website is built using a modern React stack with TypeScript for type safety. The architecture follows these key principles:

### Directory Structure
```
swiat-jezdzca/
├── src/
│   ├── components/     # React components
│   │   ├── AboutUs.tsx           # Company information
│   │   ├── BackgroundAnimations  # Background effects
│   │   ├── Cooperation          # Partnership section
│   │   ├── Footer              # Site footer
│   │   ├── Home               # Landing section
│   │   ├── HorseshoeCollector # Game component
│   │   ├── HorseshoeSpawner  # Game mechanics
│   │   ├── MouseAnimations  # Cursor effects
│   │   ├── Navigation     # Site navigation
│   │   ├── Products     # Product showcase
│   │   ├── RequestOffer # Contact form
│   │   └── Quiz/       # Interactive quiz system
│   ├── context/      # React context providers
│   ├── hooks/       # Custom React hooks
│   ├── lib/        # Utility functions
│   └── types/     # TypeScript definitions
├── public/       # Static assets
└── docs/       # Documentation
```

### Tech Stack Details

- **React 18**: Utilizing the latest features including automatic batching and concurrent rendering
- **TypeScript**: Strict type checking enabled for maximum type safety
- **Vite**: Modern build tool for fast development and optimized production builds
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Framer Motion**: Production-ready animation library
- **React Router**: Client-side routing with v6 features

## Component Documentation

### Navigation System
The navigation component (`Navigation.tsx`) implements:
- Responsive design with mobile/desktop views
- Smooth scroll functionality
- Active section highlighting
- Intersection Observer for scroll spy

```typescript
// Usage example
<Navigation 
  sections={sections}
  currentSection={currentSection}
  onNavigate={scrollToSection}
/>
```

### Animation Components

#### Home Section
The home component (`Home.tsx`) features:
- Dynamic content presentation
- Responsive text sizing
- Call-to-action buttons
- Smooth transitions and hover effects

#### HorseshoeCollector
Game component for user engagement:
- Tracks collected horseshoes
- Updates score in real-time
- Uses custom hook for state management
- Unlocks equestrian facts

```typescript
// Hook usage
const { horseshoesCollected, mousePosition, handleMouseMove } = useHorseshoe()
```

## State Management

The application uses React's built-in state management with hooks:
- Component-level state with useState
- Complex state logic in custom hooks
- Shared state through context providers
- Persistent state for game progress

### Key State Patterns

```typescript
// Section tracking
const [currentSection, setCurrentSection] = useState(0)

// Responsive design
const [isMobile, setIsMobile] = useState(false)

// Game state
const [horseshoesCollected, setHorseshoesCollected] = useState(0)
```

## Animation System

The animation system is built on Framer Motion with performance optimizations:

### Component Animations
- Smooth transitions for page sections
- Interactive hover effects
- Staggered animations for lists
- Hardware-accelerated transforms

### Mouse Animations
- Debounced mouse tracking
- Limited update frequency
- Cleanup on component unmount

## Development Workflow

### Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Start development: `npm run dev`

### Build Process
1. Development build: `npm run dev`
2. Production build: `npm run build`
3. Preview build: `npm run preview`

### Code Style
- ESLint configuration for code quality
- TypeScript strict mode enabled
- Tailwind class ordering conventions

## Performance Considerations

### Optimization Techniques
1. **Animation Performance**
   - Optimized animation properties
   - Hardware acceleration
   - Efficient state updates

2. **Asset Loading**
   - Image optimization
   - Lazy loading components
   - Route-based code splitting

3. **State Updates**
   - Batched state updates
   - Memoized callbacks
   - Optimized re-renders

### Monitoring
- Vercel Speed Insights integration
- Performance metrics tracking
- User experience monitoring

## Deployment

The application is configured for Vercel deployment:

1. **Production Deployment**
   - Automatic deployment on main branch
   - Environment variable configuration
   - Build optimization

2. **Preview Deployments**
   - PR preview deployments
   - Branch-based previews
   - Environment separation

## Security

### GDPR Compliance
- Privacy Preferences management
- Cookie consent implementation
- User data handling

### Best Practices
- Secure headers configuration
- XSS prevention
- CORS policy implementation
