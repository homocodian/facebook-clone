module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "fb-blue": "#1b74e4",
        "fb-primary-icon": "#1c1e21",
        "fb-secondary-icon": "#65676b",
        "fb-primary-text": "#1c1e21",
        "fb-gray": "#f0f2f5",
      },
      screens: {
        xs: "360px",
        sm: "550px",
        "3xl": "2000px",
      },
    },
  },
  plugins: [],
};
