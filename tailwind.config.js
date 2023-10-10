const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      eculid: ["Euclid Circular A"],
    },
    backgroundImage: {
      "image-grid-one": "url('/src/assets/images/hl1.png')",
      "image-grid-two": "url('/src/assets/images/hl2.png')",
      "image-grid-three": "url('/src/assets/images/hl3.png')",
      "image-grid-four": "url('/src/assets/images/hl4.png')",
    },
  },
  plugins: [],
});

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
