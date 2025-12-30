"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-parchment border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-terracotta text-warm-white rounded flex items-center justify-center font-mono text-sm font-bold">
              
            </div>
            <div>
              <p className="font-display font-medium text-charcoal">
                Logic Mastery
              </p>
              <p className="text-xs text-muted">
                Master logic through real-world thinking
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-slate">
            <Link href="/" className="hover:text-terracotta transition-colors">
              Home
            </Link>
            <Link href="/module/propositional" className="hover:text-terracotta transition-colors">
              Start Learning
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-terracotta transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Logic Mastery. Learn to think clearly.
          </p>
        </div>
      </div>
    </footer>
  );
}
