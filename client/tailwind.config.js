/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "red-accent": "#E51B1B",
                "blue-accent": "#4361EE",
                "dark-bg": "#252422",
                "dark-secondary": "#2F2F2F"
            }
        },
    },
    plugins: [],
}

