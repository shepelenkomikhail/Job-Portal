/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                black: '#010101',
                placeholder: 'rgb(145,149,157)'
            },
            scale: {
                101: '1.01',
                102: '1.02',
                103: '1.03',
                104: '1.04',
            }
        },
    },
    plugins: [],
    darkMode: 'selector',
}