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
                white: '#ffffff',
                pearlbush: '#e6ddd6',
                schooner: '#918983',
                quincy: '#5b3629',
                purpleheart: '#682bd7',
                portage: '#a37cf0',
                mediumredviolet: '#bd2e95',
                ash: '#c8bfb6',
                timberwolf: '#d4cfc9',
                nomad: '#b0a89f',
                sandybrown: '#ebd9c1',
                terracotta: '#e76f51',
                junglegreen: '#36cdba',
                yelloworange: 'rgba(251,191,36,0.84)',
                backgroundviolet: '#676279',
                boxviolet: '#2b2738',
                secondarydarktext: '#B0B0B0',
                secondviolettext: '#786a9c',
                buttondarkborder: '#4e4a59',
                buttondarktext: '#cbcacd',
                buttonviolet: '#6e54b5',
                darkinput: '#3b364c',
                darkplaceholder: '#6d6b79',
            }
        },
    },
    plugins: [],
    darkMode: 'selector',
}