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
            "--tw-prose-bold": theme("colors.skin.base"),
            "--tw-prose-counters": theme("colors.skin.muted"),
            "--tw-prose-counters": theme("colors.skin.muted"),
            "--tw-prose-bullets": theme("colors.skin.muted"),
            "--tw-prose-hr": theme("colors.skin.muted"),
            "--tw-prose-quotes": theme("colors.skin.muted"),
            "--tw-prose-quote-borders": theme("colors.skin.muted"),
            "--tw-prose-captions": theme("colors.skin.muted"),
            "--tw-prose-code": theme("colors.skin.muted"),
            "--tw-prose-pre-code": theme("colors.skin.muted"),
            "--tw-prose-pre-bg": theme("colors.skin.muted"),
            "--tw-prose-th-borders": theme("colors.skin.muted"),
            "--tw-prose-td-borders": theme("colors.skin.muted"),
            "--tw-prose-invert-body": theme("colors.skin.muted"),
            "--tw-prose-invert-headings": theme("colors.skin.muted"),
            "--tw-prose-invert-lead": theme("colors.skin.muted"),
            "--tw-prose-invert-links": theme("colors.skin.muted"),
            "--tw-prose-invert-bold": theme("colors.skin.muted"),
            "--tw-prose-invert-counters": theme("colors.skin.muted"),
            "--tw-prose-invert-bullets": theme("colors.skin.muted"),
            "--tw-prose-invert-hr": theme("colors.skin.muted"),
            "--tw-prose-invert-quotes": theme("ccolors.skin.muted"),
            "--tw-prose-invert-quote-borders": theme("colors.skin.muted"),
            "--tw-prose-invert-captions": theme("colors.skin.muted"),
            "--tw-prose-invert-code": theme("colors.skin.muted"),
            "--tw-prose-invert-pre-code": theme("colors.skin.muted"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.skin.muted"),
            "--tw-prose-invert-td-borders": theme("colors.skin.muted"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
