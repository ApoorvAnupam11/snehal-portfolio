/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                // Mapping 'navy' to black/gray for backward compatibility during refactor
                'navy': {
                    900: '#000000', // Pure Black
                    800: '#111111', // Very Dark Gray
                },
                // Mapping 'gold' to white/gray
                'gold': {
                    400: '#e5e5e5', // Light Gray
                    500: '#ffffff', // White
                },
                // Semantic Monochrome Palette
                'mono': {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                    950: '#030712',
                }
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'serif': ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
