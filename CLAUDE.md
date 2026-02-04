# CLAUDE.md - GutBuddy Codebase Guide

## Project Overview

GutBuddy is an AI-powered gut health companion mobile web application. It helps users track digestive health metrics, log daily symptoms, and receive AI-generated health insights through Google Gemini integration.

**Primary Language**: TypeScript/React
**Target Users**: Health-conscious individuals (Korean-speaking, UI is in Korean)
**Platform**: Mobile-first web app (optimized for 430px width)

## Tech Stack

- **Framework**: React 19.2 with TypeScript 5.8
- **Build Tool**: Vite 6.2
- **Styling**: Tailwind CSS (via CDN)
- **Charts**: Recharts 3.7
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Module System**: ES Modules

## Project Structure

```
/home/user/aigoogle/
├── components/                 # React functional components
│   ├── Onboarding.tsx         # 8-step onboarding wizard
│   ├── HomeTab.tsx            # Home dashboard with health score gauge
│   ├── LogTab.tsx             # Daily meal & symptom logging
│   ├── HistoryTab.tsx         # Calendar view with trend visualization
│   ├── InsightsTab.tsx        # AI chat interface & Bristol Scale guide
│   └── ProfileTab.tsx         # User stats & gamification display
├── services/
│   └── geminiService.ts       # Google Gemini API wrapper
├── App.tsx                     # Main app component with state management
├── index.tsx                   # React entry point
├── types.ts                    # TypeScript type definitions
├── constants.tsx              # App constants (Bristol Scale, Levels, Badges)
├── index.html                 # HTML template with Tailwind & fonts
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies & scripts
└── metadata.json              # AI Studio app metadata
```

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build to dist/
npm run preview      # Preview production build
```

## Environment Variables

Create a `.env.local` file with:
```
GEMINI_API_KEY=your_api_key_here
```

## Key Architecture Patterns

### State Management
- Local React state with `useState` and prop drilling
- No external state management library (Context API or Redux)
- State lives in `App.tsx` and flows down to child components

### Component Pattern
```typescript
interface ComponentProps {
  // Props interface defined above component
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Functional component with hooks
};
```

### Data Flow
```
App.tsx (state owner)
  ├── UserProfile state
  ├── DailyRecord[] state
  └── Passes callbacks for mutations to children
```

## Data Models

### UserProfile
```typescript
interface UserProfile {
  name: string;
  gender: 'Male' | 'Female' | 'Other' | null;
  goal: 'Relieve constipation' | 'Manage diarrhea' | 'Regular bowel movements' | 'Overall gut health' | 'Reduce bloating' | null;
  symptoms: string[];
  frequency: '2+ daily' | 'Once daily' | 'Every 2 days' | '1-2 weekly' | null;
  reminderTime: string;  // HH:MM format
  onboarded: boolean;
  level: number;
  exp: number;           // Experience points for gamification
}
```

### DailyRecord
```typescript
interface DailyRecord {
  date: string;          // ISO format YYYY-MM-DD
  feeling: { emoji: string; label: string };
  score: number;         // 0-100 health score
  stoolCount: number;
  memo: string;
}
```

### Tab Navigation
```typescript
enum Tab { Home, Log, History, Insights, Profile }
```

## API Integration

### Gemini Service (`services/geminiService.ts`)

Two main functions:

1. **`analyzeStoolImage(base64Image)`** - Image analysis for Bristol Scale classification
   - Model: `gemini-3-flash-preview`
   - Returns: `{type: 1-7, insight: string, recommendation: string}`

2. **`chatWithGutBuddy(history, message)`** - AI chat for health insights
   - Model: `gemini-3-flash-preview`
   - Persona: Korean-speaking health assistant

## Code Conventions

### Naming
- **Components**: PascalCase (`HomeTab`, `LogTab`)
- **Files**: PascalCase for components, camelCase for services
- **Variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE (`BRISTOL_SCALE`, `LEVELS`)

### Styling
- Tailwind CSS utility classes
- Custom color palette:
  - Primary gold: `#D4AF37`, `#F2D06B`
  - Secondary mint: `#A8E6CF`, `#88D4B4`
  - Background: `#FFF9F0`
- Mobile container: `max-w-[430px]` centered

### TypeScript
- Full type coverage required
- Props interfaces above components
- Union types for enums
- Strict typing for state objects

### React Patterns
- Functional components only
- Hooks: `useState`, `useEffect`, `useMemo`, `useCallback`
- `useMemo` for expensive calculations (stats, chart data)
- Inline sub-components when not reused elsewhere

## Gamification System

### Levels
| Level | Name | Emoji | EXP Required |
|-------|------|-------|--------------|
| 1 | Seed | 🌰 | 0 |
| 2 | Seedling | 🌱 | 100 |
| 3 | Leaf | 🌿 | 250 |
| 4 | Sapling | 🪴 | 500 |
| 5 | Tree | 🌳 | 1000 |
| 6 | Bloom | 🌸 | 2000 |

### EXP Rewards
- +50 EXP per logged daily record

### Badges
6 unlockable achievements (Early Bird, 7-day streak, etc.)

## Important Notes

### Current Limitations
- **No persistence**: Data stored in React state only (lost on refresh)
- **No tests**: Testing framework not configured
- **No error boundaries**: App may crash on unhandled errors
- **No linting**: ESLint/Prettier not configured

### When Making Changes
1. Keep UI text in Korean to match existing app language
2. Maintain mobile-first design (430px max-width)
3. Use Tailwind classes for styling consistency
4. Follow existing component patterns
5. Add TypeScript types for all new code
6. Use `useMemo`/`useCallback` for performance-sensitive code

### File Dependencies
- `types.ts` - Import all data types from here
- `constants.tsx` - Import BRISTOL_SCALE, LEVELS, BADGES from here
- `services/geminiService.ts` - Use for all AI interactions

## Common Tasks

### Adding a New Component
1. Create file in `components/` with PascalCase name
2. Define Props interface
3. Export as `React.FC<Props>`
4. Import and use in parent component

### Adding New State
1. Add to `App.tsx` with `useState`
2. Pass down through props
3. Update `types.ts` if new interfaces needed

### Modifying AI Behavior
Edit `services/geminiService.ts`:
- System prompts in the `systemInstruction` field
- Model selection via `model` parameter

### Updating Styling
- Use Tailwind utility classes
- Custom colors defined in `index.html` as CSS variables
- Check existing components for color naming patterns
