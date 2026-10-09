/**
 * Theme and Design System for GameHub
 * 
 * Centralizing colors, spacing, and typography ensures visual consistency
 * across all screens and makes future updates or dark/light theming straightforward.
 */

export const COLORS = {
  // Backgrounds
  background: '#0B0F19',       // Deep sleek dark background
  surface: '#161F30',          // Card and container background
  surfaceLight: '#222F46',     // Slightly elevated surface / borders
  surfaceBorder: '#2D3D58',    // Subtle card borders

  // Brand Accents
  primary: '#6366F1',          // Electric Indigo (Main brand color)
  primaryHover: '#4F46E5',     // Pressed state indigo
  primaryLight: '#818CF8',     // Highlights / active chip background
  accent: '#EC4899',           // Neon Pink accent
  
  // Semantic Colors
  star: '#FBBF24',             // Gold for ratings
  heart: '#EF4444',            // Red for favorite hearts
  heartBg: 'rgba(239, 68, 68, 0.15)', // Light red circle background
  success: '#10B981',          // Emerald green for success badges
  error: '#F87171',            // Error alert
  
  // Typography
  textPrimary: '#F8FAFC',      // Main readable heading / body text
  textSecondary: '#94A3B8',    // Secondary subtext
  textMuted: '#64748B',        // Muted captions & placeholder text
  textInverse: '#0B0F19',      // Text on bright badges

  // Overlays
  overlay: 'rgba(11, 15, 25, 0.75)',
  shimmer: '#1E293B',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Android shadow
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6.27,
    elevation: 6, // Android shadow
  },
  glow: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
};
