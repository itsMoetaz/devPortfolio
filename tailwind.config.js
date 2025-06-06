/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)', filter: 'brightness(1)' },
          '100%': { boxShadow: '0 0 40px rgba(147, 51, 234, 0.8), 0 0 60px rgba(59, 130, 246, 0.3)', filter: 'brightness(1.2)' },
        },
        twinkle: {
          '0%': { opacity: 0.3, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1.2)' },
        }
      },
      colors: {
        'space-black': '#0a0a0f',
        'nebula-purple': '#9333ea',
        'cosmic-blue': '#3b82f6',
        'star-white': '#f8fafc',
        'galaxy-pink': '#ec4899',
        'cosmic-cyan': '#06b6d4',
      },
      backgroundImage: {
        'galaxy': 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(236, 72, 153, 0.05) 50%, transparent 70%)',
        'stars': 'radial-gradient(2px 2px at 20px 30px, #eee, transparent), radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent), radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent), radial-gradient(2px 2px at 160px 30px, #ddd, transparent)',
      }
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography")
  ],
  daisyui: {
    themes: [
      {
        galaxy: {
          "primary": "#9333ea",
          "primary-focus": "#7c3aed", 
          "primary-content": "#ffffff",
          "secondary": "#3b82f6",
          "secondary-focus": "#2563eb",
          "secondary-content": "#ffffff", 
          "accent": "#ec4899",
          "accent-focus": "#db2777",
          "accent-content": "#ffffff",
          "neutral": "#1e1b2e",
          "neutral-focus": "#161320",
          "neutral-content": "#ffffff",
          "base-100": "#0a0a0f",
          "base-200": "#1a1a2e",
          "base-300": "#16213e",
          "base-content": "#e2e8f0",
          "info": "#06b6d4",
          "success": "#10b981",
          "warning": "#f59e0b", 
          "error": "#ef4444",
        }
      },
      "coffe"
    ],
    darkTheme: "galaxy",
    base: true,
    styled: true,
    utils: true,
    logs: false,
    themeRoot: ":root",
  },
}