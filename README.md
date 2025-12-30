# Logic Mastery

An interactive course for learning formal logic — from propositional calculus to predicate logic, with real-world applications.

## Why This Exists

I read [a post by Ethan Mollick](https://twitter.com/emollick) this morning about an instant interactive explainer from Claude for a frequent debate about correlation & causation:

> "Create an interactive tool that explains the ways two variables can be correlated (causation, random chance, reverse causation, etc)"

That got me thinking: *how easy is it now to build something substantial without much effort, while doing my daily work?*

This entire website was built in a single day alongside other tasks — a proof of concept for how AI-assisted development has changed what's possible. From idea to deployed production app, with 5 complete modules, 64+ exercises, and a distinctive editorial design.

## What's Inside

**5 Complete Modules:**

1. **Propositional Logic** — AND, OR, NOT, IF-THEN, IFF with interactive truth tables
2. **Translation** — Converting English to formal logic and back
3. **Validity & Proofs** — Modus Ponens, Modus Tollens, and proof strategies
4. **Predicate Logic** — Quantifiers (∀, ∃) with SQL parallels for developers
5. **Applications** — Logical fallacies and Knights & Knaves puzzles

**Features:**
- Interactive truth tables with instant feedback
- 64+ exercises across all difficulty levels
- Progress tracking (localStorage)
- Editorial "Academic Brutalism" design aesthetic

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- No backend required — fully static

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy

Push to GitHub, connect to [Vercel](https://vercel.com), done.

## License

MIT
