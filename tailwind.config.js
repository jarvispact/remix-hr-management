module.exports = {
    content: ['./src/**/*.{ts,tsx,jsx,js}'],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
            '3xl': '2000px',
        },
        colors: {
            white: 'white',
            black: 'black',
            transparent: 'transparent',
            inherit: 'inherit',

            'gray-50': 'var(--color-gray-50)',
            'gray-100': 'var(--color-gray-100)',
            'gray-200': 'var(--color-gray-200)',
            'gray-300': 'var(--color-gray-300)',
            'gray-400': 'var(--color-gray-400)',
            'gray-500': 'var(--color-gray-500)',
            'gray-600': 'var(--color-gray-600)',
            'gray-700': 'var(--color-gray-700)',
            'gray-800': 'var(--color-gray-800)',
            'gray-900': 'var(--color-gray-900)',

            'danger-light': 'var(--color-danger-light)',
            danger: 'var(--color-danger)',
            'danger-dark': 'var(--color-danger-dark)',

            'success-light': 'var(--color-success-light)',
            success: 'var(--color-success)',
            'success-dark': 'var(--color-success-dark)',

            'blue-light': 'var(--color-blue-light)',
            blue: 'var(--color-blue)',
            'blue-dark': 'var(--color-blue-dark)',

            'orange-light': 'var(--color-orange-light)',
            orange: 'var(--color-orange)',
            'orange-dark': 'var(--color-orange-dark)',

            'brand-light': 'var(--color-brand-light)',
            brand: 'var(--color-brand)',
            'brand-dark': 'var(--color-brand-dark)',
            'brand-text': 'var(--color-brand-text)',

            'surface-0': 'var(--color-surface-0)',
            'surface-1': 'var(--color-surface-1)',

            text: 'var(--color-text)',
            icon: 'var(--color-icon)',
            border: 'var(--color-border)',

            focus: 'var(--color-focus)',
            'success-text': 'var(--color-success-text)',
            'success-bg': 'var(--color-success-bg)',
            'danger-text': 'var(--color-danger-text)',
            'danger-bg': 'var(--color-danger-bg)',
        },
        borderRadius: {
            sm: 'var(--radii-sm)',
            md: 'var(--radii-md)',
            lg: 'var(--radii-lg)',
            full: '9999px',
        },
    },
    plugins: [],
};
