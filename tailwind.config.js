/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wechat-green': '#07C160',
        'wechat-green-light': '#95EC69',
        'wechat-bg': '#F7F7F7',
        'wechat-text': '#333333',
        'wechat-text-secondary': '#888888',
        'wechat-border': '#E5E5E5',
      },
    },
  },
  plugins: [],
}