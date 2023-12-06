// TailwindCSS configuration that extends basic colors

const withMT = require("@material-tailwind/react/utils/withMT")
let colors = require("tailwindcss/colors")

delete colors['lightBlue']
delete colors['warmGray']
delete colors['trueGray']
delete colors['coolGray']
delete colors['blueGray']
colors = { ...colors, ...{ transparent: 'transparent' } }
 
module.exports = withMT({
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: { colors },
  },
  plugins: [],
})
