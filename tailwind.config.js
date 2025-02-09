/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			keyframes: {
				appear: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				slideIn: {
					'from': {
						transform: { translateY: '-150px' }
					},
					'to': {
						transform: { translateY: '0' },
					}
				}
			},
			animation: {
				appear: 'appear 0.5s',
				slideIn: 'slideIn 0.2s'
			},
			top: {
				'custom': '30px',
			},
			right: {
				'25p': '25px'
			}
		},
	},
	daisyui: {
		themes: ['light', 'dark'],
		styled: true,
		utils: true,
	},
	plugins: [daisyui],
}
