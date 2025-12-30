# Logic Mastery Platform

## Project Overview

Logic Mastery is an interactive web application teaching formal logic through real-world examples. It connects every concept to concrete domains: programming, law, science, and everyday reasoning.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom design tokens
- **Content**: MDX for lessons/examples/summaries
- **State**: Zustand for progress management
- **Storage**: Local storage (MVP), accounts later
- **Animation**: Framer Motion

## Design Philosophy

**"Academic Warmth"** — A refined 1970s textbook aesthetic with modern interactivity.

### Typography
- Display/Headings: **Fraunces** (serif)
- Body: **Source Sans 3** (sans-serif)
- Code/Logic: **JetBrains Mono** (monospace)

### Color Palette
```
Background:   #FAF7F2 (cream), #FFFDF9 (cards), #F0EBE1 (code blocks)
Text:         #2C2C2C (primary), #5C5C5C (secondary), #8C8C8C (muted)
Accent:       #C75B39 (terracotta), #A84A2E (hover)
Feedback:     #5B8C6A (success), #C47C7C (error), #C9A227 (warning)
Domain Tags:  #6B8CAE (programming), #8B7355 (law), #7BA387 (science), #9B8AA6 (everyday)
```

### UI Principles
- Generous white space (textbook feel)
- Subtle paper texture backgrounds
- Soft shadows: `0 2px 8px rgba(44,44,44,0.08)`
- Border radius: 4px (small), 8px (cards)
- Borders: `1px solid #E8E4DC`

## Architecture

### Course Structure (per module)
1. **Lesson** — Scrollable MDX with interactive components
2. **Examples** — 2-3 worked problems with step-by-step reasoning
3. **Practice** — Step-by-step exercises with immediate feedback
4. **Summary** — Quick reference cheat sheet

### Key Directories
```
src/
├── app/                    # Next.js routes
├── components/
│   ├── ui/                 # Base UI (Button, Card, ProgressRing)
│   ├── layout/             # Header, ModuleNav, Footer
│   ├── learning/           # TruthTable, MiniQuiz, Callout, Expandable
│   ├── examples/           # WorkedProblem, Step, CommonMistake
│   ├── practice/           # ExerciseCard, ProofBuilder, FeedbackToast
│   └── summary/            # CheatSheet, ModuleLink
├── content/                # MDX files per module
├── lib/                    # Utilities (mdx, progress, exercises)
├── hooks/                  # useProgress, useExercise, useLocalStorage
└── types/                  # TypeScript types
```

### Modules
1. Propositional Logic (12+ exercises)
2. Translation (15+ exercises)
3. Validity & Proofs (10+ exercises + Proof Builder)
4. Predicate Logic (12+ exercises + SQL Parallels)
5. Applications (15+ exercises: Fallacies + Puzzles)

## Interactive MDX Components

Available in lesson/example MDX files:

```mdx
<TruthTable editable variables={['P', 'Q']} expression="P ∧ Q" />
<MiniQuiz question="..." options={[...]} correct={0} explanation="..." />
<Expandable title="Deep Dive: ...">Content</Expandable>
<Callout type="info|warning|why|tip">Message</Callout>
<Definition term="Proposition">Definition text</Definition>
<AnimatedDiagram type="implication" autoplay={false} />
<WorkedProblem number={1}>...</WorkedProblem>
<Step number={1}>Step explanation</Step>
<CommonMistake>Warning about common error</CommonMistake>
<CheatSheet>...</CheatSheet>
<Symbol name="∧" meaning="AND" truth="True only if both true" />
<ModuleLink to={2}>Link text</ModuleLink>
```

## Development Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run lint      # Run ESLint
```

## Implementation Notes

### When building UI components
- Use the **frontend-design skill** for all UI work
- Avoid generic aesthetics — commit to Academic Warmth
- Ensure rich interactivity in lessons (toggleable truth tables, inline quizzes)
- Lessons scroll, Practice is step-by-step

### Progress System
- Store in localStorage under `logic-mastery-progress`
- Track: lesson completion, examples viewed, exercise results, preferences
- Color-code mastery: green >70%, terracotta otherwise

### Accessibility
- Keyboard navigation for all exercises
- Focus states on interactive elements
- ARIA labels for logic symbols
- Sufficient color contrast (4.5:1 minimum)

## Content Guidelines

### Lesson MDX
- Start with "Why this matters" callout
- Include 2-3 interactive elements (truth tables, mini quizzes)
- Address common misconceptions
- Offer expandable deep dives for curious learners

### Examples MDX
- 2-3 worked problems per module
- Step-by-step with numbered <Step> components
- Highlight where people typically go wrong with <CommonMistake>

### Exercise JSON
- Include: id, domain, question, answer, alternatives, explanation
- Tag every exercise with domain (programming, law, science, everyday)
- Provide detailed explanations for feedback

## Reference

- Original spec: `/Users/gregld/Downloads/logic-mastery-spec.txt`
- Design doc: `docs/plans/YYYY-MM-DD-logic-mastery-design.md` (after creation)
