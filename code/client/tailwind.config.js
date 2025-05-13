/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative:true,
    files: [
      "./index.html",
      "./src/components/**/*.vue",
      "./src/layouts/**/*.vue",
      "./src/pages/**/*.vue",
    ],
},
  safelist:[
    "bg-gradient-to-*",
    "from-*",
    "to-*",
    "uppercase",
    "text-*",
  ],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        app: {
          background: "rgb(from var(--app-background) r g b / <alpha-value>)",
          primary:
              "rgb(from var(--app-text-color-primary) r g b / <alpha-value>)",
          secondary:
              "rgb(from var(--app-text-color-secondary) r g b / <alpha-value>)",
          error: "rgb(from var(--app-error) r g b / <alpha-value>)",
          success: "rgb(from var(--app-success) r g b / <alpha-value>)",
          warning: "rgb(from var(--app-warning) r g b / <alpha-value>)",
          info: "rgb(from var(--app-info) r g b / <alpha-value>)"
      }
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(from var(--app-box-shadow-color) r g b / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(from var(--app-boxshadow-color) r g b / 0.1), 0 1px 2px -1px rgb(from var(--app-box-shadow-color) r g b / 0.1)',
        md: '0 4px 6px -1px rgb( rom var(--app-box-shadow-color) r g b / 0.1), 0 2px 4px -2px rgb(from var(--app-box-shadow-color) r g b / 0.1)',
        lg: '0 10px 15px -3px rgb(from var(--app-box-shadow-color) r g b / 0.1), 0 4px 6px -4px rgb(from var(--app-box-shadow-color) r g b / 0.1)',
        xl: '0 20px 25px -5px rgb(from var(--app-box-shadow-color) r g b / 0.1), 0 8px 10px -6px rgb(from var(--app-box-shadow-color) r g b / 0.1)',
        '2xl': '0 25px 50px -12px rgb(from var(--app-box-shadow-color) r g b / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(from var(--app-box-shadow-color) r g b / 0.05)',
        none: 'none',
       }
    },
  },
  plugins: [],
}

