import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

const pxToRem = (px: number, base = 16) => {
  return `${px / base}rem`
}

const generateFontSize = () => {
  const min = 12
  const max = 100
  const fontSize: {
    [key: string]: string,
  } = {}

  for (let i = min; i <= max; i += 2) {
    fontSize[i] = pxToRem(i)
  }

  return fontSize
}

const generateBorderRadius = () => {
  const max = 24
  const borderRadius: {
    [key: string]: string,
  } = {}

  for (let i = 0; i <= max; i += 2) {
    const value = i
    borderRadius[i] = pxToRem(value)
  }
  borderRadius["full"] = "9999px"

  return borderRadius
}

const generateSpacing = () => {
  const max = 5000
  const spacing: {
    [key: string]: string,
  } = {}

  for (let i = 0; i <= max; i++) {
    spacing[i] = `${i}px`
  }

  return spacing
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: generateBorderRadius(),
      fontSize: generateFontSize(),
      spacing: generateSpacing(),
    },
    fontFamily: {
      "sans": ["Merriweather", "sans-serif"]

    }
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      {
        myTheme: {
          'primary': "#2e148e",
          "base-100": "#f7f8fa",
        }
      }
    ]
  }
} satisfies Config

