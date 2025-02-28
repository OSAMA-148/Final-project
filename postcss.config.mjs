const config = {
    plugins: ["@tailwindcss/postcss"],
    theme: {
        extend: {
            colors: {
                p1: "#007AFF",
                p2: "#018001",
                p3: "#F0060A",
                p4: "#6BB505",
            },
            fontFamily: {
                sans: ["Helvetica Neue", "Arial", "sans-serif"],
                serif: ["Georgia", "Cambria", "serif"],
                mono: ["Courier New", "Courier", "monospace"],
            },
        },
    },
};

export default config;
