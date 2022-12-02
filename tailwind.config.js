module.exports = {
	content: [
		'./src/**/*.tsx'
	],
	theme: {
		extend: {
			screens: {
				'tall': { 'raw': '(min-height: 750px)' }
			}
		}
	},
	plugins: []
}