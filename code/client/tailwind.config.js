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
    extend: {},
  },
  plugins: [],
}

