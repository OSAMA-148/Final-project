const config = {
    plugins: ["@tailwindcss/postcss"],
    theme: {
        extend: {
            backgroundImage: {
                "custom-bg": "url('/back.png')",
            },
        },
    },
};

export default config;
