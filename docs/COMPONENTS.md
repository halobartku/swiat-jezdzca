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
    { id: 1, title: 'Produkty', icon: Goal },
    { id: 2, title: 'Współpraca', icon: Handshake }
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

### Usage
```tsx
<Home 
  onDiscoverClick={() => scrollToSection(1)}
  onContactClick={() => scrollToSection(5)}
/>
```

## AboutUs Component

`AboutUs.tsx` - Company information and values presentation page.

### Implementation
```typescript
interface ValueCard {
  title: string;
  description: string;
  impact: string;
  icon: React.ElementType;
}
```

### Features
- Company introduction section
- Value cards grid showcasing company strengths:
  - Polish Product Quality
  - Design Team Expertise
  - Individual Approach
  - European Market Presence
- Priorities section with numbered steps
- Contact button with email integration

### Styling
- Responsive grid layout (1 column on mobile, 2 columns on desktop)
- Interactive card animations with hover effects
- Icon rotations on hover
- Consistent spacing and typography
- Shadow effects and transitions
- Semi-transparent backgrounds for cards

### Layout
- Two-column desktop layout with main content and sidebar
- Flex layout for vertical content distribution
- Mobile-first responsive design
- Precise spacing for optimal alignment

### Usage
```tsx
<AboutUs />
```

## Cooperation Component

`Cooperation.tsx` - Displays company process and client testimonials.

### Features
- Process visualization with icons and descriptions
- Auto-playing testimonial carousel
- Star ratings for testimonials
- Responsive design for all screen sizes
- Smooth animations and transitions

### Implementation
```typescript
interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}
```

### Styling
- Gradient background for process section
- Animated transitions for testimonials
- Interactive navigation controls
- Consistent spacing and typography
- Hover effects on process icons

### Usage
```tsx
<Cooperation />
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

## Quiz Components

### Game Component

`Game.tsx` - Main quiz game controller component.

### Props
```typescript
interface GameProps {
  onComplete: (result: RiderType) => void;
}
```

### Features
- Question progression management
- Score calculation
- Result determination
- Progress tracking
- Error handling

### Usage
```tsx
<Game onComplete={(result) => handleQuizComplete(result)} />
```

### QuizQuestion Component

`QuizQuestion.tsx` - Individual quiz question display and interaction.

### Props
```typescript
interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
  currentIndex: number;
  totalQuestions: number;
}
```

### Features
- Answer selection handling
- Progress indication
- Question category display
- Answer validation

### Usage
```tsx
<QuizQuestion
  question={currentQuestion}
  onAnswer={handleAnswer}
  currentIndex={questionIndex}
  totalQuestions={totalQuestions}
/>
```

### ResultsChat Component

`ResultsChat.tsx` - AI-powered chat interface for personalized training consultation.

### Props
```typescript
interface ResultsChatProps {
  result: RiderType;
  aiResult: {
    personalizedAnalysis: string;
    detailedRecommendations: string[];
    customizedTrainingPlan: string;
    strengthsAndWeaknesses: {
      strengths: string[];
      areasForImprovement: string[];
    };
    longTermVision: string;
  };
}
```

### Features
- Real-time AI chat interaction
- Context-aware responses based on quiz results
- Professional technical consultation
- Discipline-specific training advice
- Message history management
- Loading states and error handling

### Styling
- Clean, professional interface
- Consistent with main site design
- Mobile-first responsive layout
- Message bubbles with proper spacing
- Loading animations
- Subtle gradients and shadows
- Semi-transparent backgrounds

### Navigation
- Compact navigation tabs
- Active tab indication with thin red underline
- Icon and text alignment
- Hover effects for better interaction
- Clear visual hierarchy

### Usage
```tsx
<ResultsChat 
  result="trainer"
  aiResult={{
    personalizedAnalysis: "...",
    detailedRecommendations: ["...", "..."],
    customizedTrainingPlan: "...",
    strengthsAndWeaknesses: {
      strengths: ["...", "..."],
      areasForImprovement: ["...", "..."]
    },
    longTermVision: "..."
  }}
/>
```

### QuizResults Component

`QuizResults.tsx` - Displays comprehensive quiz results with multiple tabs.

### Features
- Profile overview
- Technical analysis
- Training plan recommendations
- Vision and goals
- Interactive chat consultation

### Styling
- Tab-based navigation
- Professional data visualization
- Clear section hierarchy
- Consistent spacing and typography
- Mobile-responsive layout

### Usage
```tsx
<QuizResults 
  result={quizResult}
  scores={scores}
  riderTypeDetails={riderTypeDetails}
  onRestart={() => {}}
/>
```

### ResultsProfile Component

`ResultsProfile.tsx` - Displays user's rider profile based on quiz results.

### Props
```typescript
interface ResultsProfileProps {
  result: RiderType;
  scores: CategoryScores;
}
```

### Features
- Profile type display
- Score breakdown
- Strength analysis
- Development areas
- Visual representation of results

### Usage
```tsx
<ResultsProfile result={riderType} scores={categoryScores} />
```

### ResultsAnalysis Component

`ResultsAnalysis.tsx` - Provides detailed analysis of quiz responses.

### Props
```typescript
interface ResultsAnalysisProps {
  result: RiderType;
  aiResult: AIAnalysis;
}
```

### Features
- Response pattern analysis
- Skill level assessment
- Development recommendations
- Technical insights
- Visual data presentation

### Usage
```tsx
<ResultsAnalysis result={riderType} aiResult={analysisData} />
```

### ResultsVision Component

`ResultsVision.tsx` - Presents long-term development vision.

### Props
```typescript
interface ResultsVisionProps {
  result: RiderType;
  aiResult: {
    longTermVision: string;
    milestones: string[];
  };
}
```

### Features
- Long-term goals visualization
- Development milestones
- Achievement tracking
- Progress indicators
- Interactive timeline

### Usage
```tsx
<ResultsVision result={riderType} aiResult={visionData} />
```

6. **Quiz Component Best Practices**
   - Maintain professional tone in UI
   - Use consistent spacing in navigation
   - Implement proper loading states
   - Handle errors gracefully
   - Keep chat context organized
   - Use appropriate icons for navigation
   - Follow mobile-first design principles
   - Implement proper accessibility features
