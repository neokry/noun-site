const defaultTheme = require("tailwindcss/defaultTheme");

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skin: {
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
          inverted: withOpacity("--color-text-inverted"),
        },
      },
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
          inverted: withOpacity("--color-text-inverted"),
          highlighted: withOpacity("--color-text-highlighted"),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          muted: withOpacity("--color-muted"),
          backdrop: withOpacity("--color-backdrop"),
          "button-accent": withOpacity("--color-button-accent"),
          "button-accent-hover": withOpacity("--color-button-accent-hover"),
          "button-muted": withOpacity("--color-button-muted"),
        },
      },
      borderColor: {
        skin: {
          stroke: withOpacity("--color-stroke"),
        },
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity("--color-fill"),
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
        body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
      },
      typography: ({ theme }) => ({
        skin: {
          css: {
            "--tw-prose-body": theme("colors.skin.muted"),
            "--tw-prose-headings": theme("colors.skin.base"),
            "--tw-prose-lead": theme("colors.skin.muted"),
            "--tw-prose-links": theme("colors.skin.muted"),
            "--tw-prose-bold": theme("ccolors.skin.muted"),
            "--tw-prose-counters": theme("colors.skin.muted"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
