/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'], theme: {
        fontFamily: {
            'sans': ['-apple-system', 'BlinkMacSystemFont', "Inter", 'Helvetica Neue', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
            'mono': ['SFMono-Regular', 'JetBrains Mono',],

        }, extend: {
            animation: {
                fadeOut: 'fadeOut 1s ease-in-out', fadeIn: 'fadeIn 1s ease-in-out',
            },

            keyframes: {
                fadeIn: {
                    '0%': {opacity: '0'}, '100%': {opacity: '1'},
                }, fadeOut: {
                    '0%': {opacity: '1'}, '100%': {opacity: '0'},
                }
            }
        }
    }, plugins: []
};
