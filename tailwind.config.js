const withMT = require("@material-tailwind/react/utils/withMT")
const colors = require("tailwindcss/colors")
 
module.exports = withMT({
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: { colors },
  },
  plugins: [],
})
