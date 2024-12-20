# Development Guide

This guide covers everything you need to know to start developing the Świat Jeźdźca website.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or pnpm
- Git
- VSCode (recommended)

### Initial Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/swiat-jezdzca.git
cd swiat-jezdzca
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## Development Workflow

### Branch Strategy

- `main` - Production branch
- `develop` - Development branch
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`

### Commit Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

### Code Style

#### TypeScript

- Use strict mode
- Define interfaces for all props
- Use type inference when possible
- Avoid `any` type

```typescript
// Good
interface Props {
  horseshoesCollected: number;
  onCollect: () => void;
}

// Bad
interface Props {
  horseshoesCollected: any;
  onCollect: Function;
}
```

#### React

- Use functional components
- Implement proper cleanup in useEffect
- Memoize callbacks and values appropriately
- Handle loading and error states

```typescript
// Good
const HorseshoeCollector = ({ horseshoesCollected }: Props) => {
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const generateCode = async () => {
      try {
        setLoading(true);
        const code = await generateDiscountCode();
        if (mounted) {
          setDiscountCode(code);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (horseshoesCollected === 10) {
      generateCode();
    }

    return () => {
      mounted = false;
    };
  }, [horseshoesCollected]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <div>{/* Render collector UI */}</div>;
};
```

#### CSS/Tailwind

- Follow mobile-first approach
- Use semantic class names
- Maintain consistent spacing
- Group related classes
- Implement consistent button patterns

```tsx
// Good - Grouped classes with consistent patterns
<div className="
  fixed bottom-8 left-8 z-50
  bg-white/80 backdrop-blur-sm
  rounded-lg shadow-lg
  p-2 border border-brown-200
  flex flex-col gap-2
">

// Bad - Unorganized classes
<div className="fixed p-2 bg-white/80 bottom-8 left-8 z-50 rounded-lg shadow-lg backdrop-blur-sm border border-brown-200 flex flex-col gap-2">
```

#### Gradient Button Pattern

Use consistent gradient patterns for buttons across the site:

```tsx
// Primary gradient button
<button className="
  px-8 py-3
  bg-gradient-to-r from-[#ff4d4d] to-white
  text-black font-medium
  rounded-full
  transition-all duration-300
  shadow-md hover:shadow-lg
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
">
  Primary Action
</button>

// Secondary gradient button (reversed)
<button className="
  px-8 py-3
  bg-gradient-to-r from-white to-[#ff4d4d]
  text-black font-medium
  rounded-full
  transition-all duration-300
  shadow-md hover:shadow-lg
  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
">
  Secondary Action
</button>
```

#### Background Image with Overlay

Implement background images with proper overlay and text readability:

```tsx
// Container with background image
<div 
  className="relative overflow-hidden rounded-lg"
  style={{
    backgroundImage: 'url("/path/to/image.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  {/* Semi-transparent overlay */}
  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
  
  {/* Content */}
  <div className="relative z-10">
    <h2 className="text-white">Content goes here</h2>
  </div>
</div>
```

### Game Mechanics Implementation

#### Game Initialization

The game starts with the HorseshoeInfoPopup component, which explains the mechanics and lets users choose to participate:

```typescript
const HorseshoeInfoPopup = () => {
  // Show popup only on first visit
  const [isVisible, setIsVisible] = useState(false);
  const { disableSpawn } = useHorseshoe();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenHorseshoeInfo');
    if (!hasSeenPopup) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = (startGame: boolean) => {
    if (!startGame) {
      disableSpawn(); // Disable game if user chooses not to play
    }
    setIsVisible(false);
    localStorage.setItem('hasSeenHorseshoeInfo', 'true');
  };
};
```

#### Horseshoe Spawning

```typescript
const HorseshoeSpawner = () => {
  const spawnHorseshoe = useCallback(() => {
    // Calculate random position within viewport
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    // Ensure horseshoe is within bounds
    return {
      x: Math.max(50, Math.min(x, window.innerWidth - 50)),
      y: Math.max(50, Math.min(y, window.innerHeight - 50))
    };
  }, []);

  return <div>{/* Render horseshoes */}</div>;
};
```

#### Collection Detection

```typescript
const detectCollection = (mouseX: number, mouseY: number, horseshoeX: number, horseshoeY: number) => {
  const distance = Math.sqrt(
    Math.pow(mouseX - horseshoeX, 2) + 
    Math.pow(mouseY - horseshoeY, 2)
  );
  return distance < 50; // Collection radius in pixels
};
```

### Performance Optimization

#### Code Splitting

Use React.lazy for route-based code splitting:

```typescript
const AboutUs = React.lazy(() => import('./components/AboutUs'));
```

#### Image Optimization

- Use appropriate image formats
- Implement lazy loading
- Provide width and height attributes

```tsx
<img
  src="/images/Products/Treningowe/ALL_001 white-min.png"
  alt="Przeszkoda treningowa"
  width={800}
  height={600}
  loading="lazy"
/>
```

#### Animation Performance

- Use transform instead of left/top
- Implement will-change when needed
- Reduce animation complexity on mobile

```tsx
// Good
<motion.div
  style={{ transform: 'translateY(-10px)' }}
  animate={{ y: 0 }}
/>

// Bad
<motion.div
  style={{ bottom: '-10px' }}
  animate={{ bottom: 0 }}
/>
```

#### Form Handling with Multiple Choice

Implement multiple choice selection in forms:

```typescript
// Form data interface
interface FormData {
  name: string;
  email: string;
  selections: string[];
}

// Component implementation
const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    selections: []
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      selections: checked 
        ? [...prev.selections, value]
        : prev.selections.filter(item => item !== value)
    }));
  };

  return (
    <form>
      {/* Multiple choice section */}
      <div className="grid grid-cols-2 gap-2">
        {options.map(option => (
          <label key={option.value} className="flex items-center space-x-2 p-2 rounded hover:bg-white/10">
            <input
              type="checkbox"
              value={option.value}
              checked={formData.selections.includes(option.value)}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </form>
  );
};
```

### Testing

#### Unit Tests

Use Jest and React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import { HorseshoeCollector } from './HorseshoeCollector';

describe('HorseshoeCollector', () => {
  it('displays correct rank based on horseshoes collected', () => {
    render(<HorseshoeCollector horseshoesCollected={50} />);
    
    expect(screen.getByText('Poziom Stacjonata 80cm')).toBeInTheDocument();
  });
});
```

#### Integration Tests

Test component interactions:

```typescript
import { render, fireEvent, screen } from '@testing-library/react';
import { HorseshoeSpawner } from './HorseshoeSpawner';

describe('HorseshoeSpawner', () => {
  it('spawns horseshoe on game start', async () => {
    render(<HorseshoeSpawner />);
    
    const toggleButton = screen.getByText('Gra');
    fireEvent.click(toggleButton);
    
    expect(await screen.findByTestId('horseshoe')).toBeInTheDocument();
  });
});
```

### Build and Deploy

#### Development Build

```bash
npm run dev
```

#### Production Build

```bash
npm run build
npm run preview # Test production build locally
```

#### Deployment

The project is configured for Vercel deployment:

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy with git push to main

### Environment Variables

Create a `.env` file for local development:

```env
VITE_API_URL=http://localhost:3000
VITE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

Production variables should be configured in Vercel dashboard.

### Troubleshooting

Common issues and solutions:

1. **Build Failures**
   - Clear node_modules and package-lock.json
   - Run npm install
   - Check for TypeScript errors

2. **Animation Performance**
   - Reduce horseshoe spawn rate on mobile
   - Implement proper cleanup
   - Use Chrome DevTools Performance tab

3. **Memory Leaks**
   - Check useEffect cleanup
   - Verify event listener removal
   - Monitor with Chrome DevTools Memory tab

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion API](https://www.framer.com/motion/)
- [Vercel Documentation](https://vercel.com/docs)
