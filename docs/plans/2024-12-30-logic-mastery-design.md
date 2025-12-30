# Logic Mastery Platform — Design Document

**Date**: December 30, 2024  
**Status**: Approved  
**Version**: 1.0

---

## 1. Overview

Logic Mastery is an interactive web application teaching formal logic through real-world examples. The platform expands beyond practice exercises to include a complete learning cycle:

**Learn → Understand → Practice → Apply**

Each module contains:
1. **Lesson** — Core concept explanation with interactive elements
2. **Examples** — Step-by-step worked problems
3. **Practice** — Interactive exercises with immediate feedback
4. **Summary** — Quick reference cheat sheet

---

## 2. Target Users

- Self-learners (programmers, analysts, professionals)
- University students (discrete math, formal logic courses)
- Critical thinkers (fallacy identification, clearer reasoning)

---

## 3. Information Architecture

### Site Structure

```
Home (landing + module overview)
├── Module 1: Propositional Logic
│   ├── Lesson
│   ├── Examples
│   ├── Practice
│   └── Summary
├── Module 2: Translation
│   └── (same structure)
├── Module 3: Validity & Proofs
│   └── (same structure + Proof Builder)
├── Module 4: Predicate Logic
│   └── (same structure + SQL Parallels)
├── Module 5: Applications
│   └── (same structure)
└── Progress Dashboard
```

### Navigation

- **Top nav**: Logo, Module dropdown, Progress indicator, Theme toggle
- **Module nav**: Horizontal tabs (Lesson | Examples | Practice | Summary)
- **Practice nav**: Step indicator + Previous/Next

### User Flow

```
Landing → Select Module → Lesson (scroll) → Examples (scroll) 
       → Practice (step-by-step) → Summary (reference)
       → Next Module unlocks
```

---

## 4. Visual Design System

### Design Direction: "Academic Warmth"

A refined 1970s textbook aesthetic with modern interactivity. Avoids generic AI aesthetics (purple gradients, Inter font, rounded everything).

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display/Hero | Fraunces | 600 | 48-64px |
| Headings | Fraunces | 500 | 24-36px |
| Body | Source Sans 3 | 400 | 16-18px |
| Code/Logic | JetBrains Mono | 400 | 14-16px |
| UI/Labels | Source Sans 3 | 500 | 12-14px |

### Color Palette

**Background**
- Cream: `#FAF7F2` (primary bg)
- Warm White: `#FFFDF9` (cards)
- Parchment: `#F0EBE1` (code blocks, callouts)

**Text**
- Charcoal: `#2C2C2C` (primary)
- Slate: `#5C5C5C` (secondary)
- Muted: `#8C8C8C` (hints, captions)

**Accent**
- Terracotta: `#C75B39` (primary action)
- Terracotta Dark: `#A84A2E` (hover)

**Feedback**
- Sage Green: `#5B8C6A` (correct/success)
- Dusty Rose: `#C47C7C` (incorrect/error)
- Gold: `#C9A227` (warning/hint)

**Domain Tags**
- Programming: `#6B8CAE` (steel blue)
- Law: `#8B7355` (bronze)
- Science: `#7BA387` (forest)
- Everyday: `#9B8AA6` (lavender)

### Spacing Scale (8px base)

```
xs: 4px   sm: 8px   md: 16px   lg: 24px   xl: 32px   2xl: 48px   3xl: 64px
```

### Visual Characteristics

- Generous white space
- Subtle paper texture on backgrounds
- Soft shadows: `0 2px 8px rgba(44,44,44,0.08)`
- Border radius: 4px (small), 8px (cards)
- Thin borders: `1px solid #E8E4DC`

---

## 5. Component Library

### Core UI Components

| Component | Purpose | States |
|-----------|---------|--------|
| Button | Primary actions | default, hover, active, disabled |
| Card | Content containers | default, elevated, interactive |
| ProgressRing | Circular progress | percentage-based, color-coded |
| StepIndicator | Exercise progress | current, completed, upcoming |
| DomainTag | Domain identifier | programming, law, science, everyday |

### Learning Components (MDX)

| Component | Purpose |
|-----------|---------|
| TruthTable | Interactive truth table grid |
| LogicExpression | Styled logic notation |
| MiniQuiz | Inline checkpoint questions |
| Callout | Info/warning/tip boxes |
| Expandable | Collapsible deep-dive content |
| Definition | Term definitions |
| AnimatedDiagram | SVG logic diagrams |

### Examples Components (MDX)

| Component | Purpose |
|-----------|---------|
| WorkedProblem | Container for step-by-step solution |
| Step | Individual solution step |
| CommonMistake | Warning about typical errors |

### Practice Components

| Component | Purpose |
|-----------|---------|
| ExerciseCard | Single exercise container |
| ProofBuilder | Multi-line proof constructor |
| FeedbackToast | Correct/incorrect feedback |

### Summary Components (MDX)

| Component | Purpose |
|-----------|---------|
| CheatSheet | Symbol reference table |
| Symbol | Individual symbol entry |
| ModuleLink | Link to related modules |

---

## 6. Content Structure

### File Organization

```
content/
├── module-1-propositional/
│   ├── lesson.mdx
│   ├── examples.mdx
│   ├── exercises.json
│   └── summary.mdx
├── module-2-translation/
├── module-3-validity/
├── module-4-predicate/
└── module-5-applications/
```

### Lesson MDX Template

```mdx
---
title: "Module Title"
module: 1
estimatedTime: "15 min"
---

# Main Heading

<Callout type="why">
Why this matters: Connection to real world...
</Callout>

## Core Concepts
Explanation with intuition-building...

<TruthTable editable variables={['P', 'Q']} expression="P ∧ Q" />

## Key Definitions
<Definition term="Term">Definition</Definition>

## Common Misconceptions
<Callout type="warning">Warning text</Callout>

<MiniQuiz question="..." options={[...]} correct={0} explanation="..." />

<Expandable title="Deep Dive: Topic">
Extended content...
</Expandable>
```

### Examples MDX Template

```mdx
---
title: "Worked Examples"
module: 1
---

# Worked Examples

<WorkedProblem number={1}>
  <Problem>Problem statement</Problem>
  <Step number={1}>First step</Step>
  <Step number={2}>Second step</Step>
  <CommonMistake>Warning</CommonMistake>
</WorkedProblem>
```

### Summary MDX Template

```mdx
---
title: "Quick Reference"
module: 1
---

# Quick Reference

<CheatSheet>
  <Symbol name="∧" meaning="AND" truth="True only if both true" />
</CheatSheet>

## Key Takeaways
1. Takeaway one
2. Takeaway two

<ModuleLink to={2}>Next module preview</ModuleLink>
```

### Exercise JSON Schema

```json
{
  "id": "prop-1-01",
  "domain": "programming",
  "difficulty": "beginner",
  "question": "Question text",
  "answer": true,
  "alternatives": [],
  "explanation": "Detailed feedback"
}
```

---

## 7. Technical Architecture

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with @next/mdx
- **State**: Zustand
- **Animation**: Framer Motion
- **Storage**: localStorage (MVP)

### Project Structure

```
logic-mastery/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── module/[id]/
│   │       ├── page.tsx
│   │       ├── lesson/page.tsx
│   │       ├── examples/page.tsx
│   │       ├── practice/page.tsx
│   │       └── summary/page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── learning/
│   │   ├── examples/
│   │   ├── practice/
│   │   └── summary/
│   ├── content/
│   ├── lib/
│   ├── hooks/
│   └── types/
├── public/fonts/
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

### Local Storage Schema

```typescript
interface UserProgress {
  modules: {
    [moduleId: string]: {
      lessonCompleted: boolean;
      examplesViewed: boolean;
      exercises: {
        [exerciseId: string]: {
          completed: boolean;
          correct: boolean;
          attempts: number;
        }
      };
      summaryViewed: boolean;
    }
  };
  lastVisited: string;
  preferences: {
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    theme: 'light' | 'dark';
  };
}
```

---

## 8. Module Content Scope

| Module | Exercises | Special Features |
|--------|-----------|------------------|
| 1. Propositional Logic | 12+ | Interactive truth tables |
| 2. Translation | 15+ | Ambiguous sentence handling |
| 3. Validity & Proofs | 10+ | Proof Builder tool |
| 4. Predicate Logic | 12+ | SQL Parallels feature |
| 5. Applications | 15+ | Fallacies + Logic Puzzles |

**Total**: 64+ exercises, 5 complete modules

---

## 9. Accessibility Requirements

- Keyboard navigation for all interactive elements
- Focus indicators on buttons and inputs
- ARIA labels for logic symbols
- Color contrast minimum 4.5:1
- Screen reader support for exercises

---

## 10. Future Considerations (Post-MVP)

- User accounts with cloud sync
- Spaced repetition system
- Exercise expansion (100+ per module)
- Argument analyzer tool
- Procedural puzzle generation
- Additional modules (modal logic, set theory)

---

## Appendix: Page Wireframes

### Home Page

```
┌─────────────────────────────────────────────────────────┐
│  [Logo: Logic Mastery]              [Progress] [Theme]  │
├─────────────────────────────────────────────────────────┤
│         "Master Logic Through Real-World Thinking"      │
│    ┌─────────┐  ┌─────────┐  ┌─────────┐               │
│    │Module 1 │  │Module 2 │  │Module 3 │               │
│    │  ●●○○   │  │  ○○○○   │  │   🔒    │               │
│    └─────────┘  └─────────┘  └─────────┘               │
└─────────────────────────────────────────────────────────┘
```

### Module Lesson Page

```
┌─────────────────────────────────────────────────────────┐
│  [← Back]   Module 1: Propositional Logic    [Progress] │
├─────────────────────────────────────────────────────────┤
│  [ Lesson ]  [ Examples ]  [ Practice ]  [ Summary ]    │
├─────────────────────────────────────────────────────────┤
│  # Chapter Heading                                      │
│  Body text...                                           │
│  ┌─ Interactive Truth Table ─────────────────────┐     │
│  │  P  │  Q  │  P ∧ Q                             │     │
│  └────────────────────────────────────────────────┘     │
│  ┌─ Mini Quiz ───────────────────────────────────┐     │
│  │  Question text...                              │     │
│  │  ○ Option A   ● Option B                       │     │
│  └────────────────────────────────────────────────┘     │
│                    [Continue to Examples →]             │
└─────────────────────────────────────────────────────────┘
```

### Practice Page

```
┌─────────────────────────────────────────────────────────┐
│  [ Lesson ]  [ Examples ]  [•Practice•]  [ Summary ]    │
├─────────────────────────────────────────────────────────┤
│     Exercise 3 of 12          ●●●○○○○○○○○○              │
│     [Programming]                                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Question text...                                │   │
│  │       [ TRUE ]        [ FALSE ]                 │   │
│  └─────────────────────────────────────────────────┘   │
│     [💡 Show Hint]                                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │  [← Previous]                      [Next →]     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

*End of Design Document*
