/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "81px": "81px",
        "100px": "100px",
        "300px": "260px",
      },
      colors: {
        customBrownOne: "#FAF8F1",
        customBrownTwo: "#FAEAB1",
        customBrownThree: "#E5BA73",
        customBrownFour: "#C58940",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
