// tailwind.config.js
import { defineConfig } from 'tailwindcss'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        // Example custom colors
        brand: {
          light: '#3AB0FF',
          DEFAULT: '#0088CC',
          dark: '#005F99',
        },
        red: {
            default: "rgb(237, 53, 53)",
            light: "rgb(247, 212, 212)"
        }
      },
    },
  },
  plugins: [],
})
