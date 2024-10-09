/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
      colors: {
        black: 'rgb(var(--color-black))',
        gray: 'rgb(var(--color-gray))',
        blue: 'rgb(var(--color-blue))'
      }
    },
	},
	plugins: []
};
