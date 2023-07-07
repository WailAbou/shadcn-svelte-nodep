/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
    },
    extend: {
      colors: {
        // ESOMAR colour pallete
        primary: "#003B64",
        "primary-dark": "#00233C",
        secondary: "#D9005D",
        "secondary-dark": "#8a0033",
        primart_50: "#7DB6B8",
        ser_white: "#fafafa",

        // text colour
        gray_primary: "#454b57",

        // footer backgroud
        gray_footer: "#E5E5E5",

        //  approval buttons
        "red-light": "#FDE1E0",
        "red-dark": "#C5494B",
      },
      boxShadow: {
        nav: [
          "rgb(0 0 0 / 14%) 0px 2px 2px 0px",
          "rgb(0 0 0 / 12%) 0px 1px 5px 0px",
          "rgb(0 0 0 / 20%) 0px 3px 1px -2px",
        ],
      },
      backgroundImage: {
        "home-header": "url('/assets/images/banner/background-header.png')",
      },
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
      },
    },
  },
  // plugins: [require("@tailwindcss/forms")],
};
