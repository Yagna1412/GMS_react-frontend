/** @type {import('tailwindcss').Config} */
<<<<<<< HEAD
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/ui/**/*.{js,jsx,ts,tsx}",
    "./src/superadmin/**/*.{js,jsx,ts,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        background: "#EFF6FF",
        foreground: "#1E293B",

        card: "#FFFFFF",
        "card-foreground": "#1E293B",

        primary: "#2563EB",
        "primary-foreground": "#FFFFFF",

        secondary: "#3B82F6",
        "secondary-foreground": "#FFFFFF",

        muted: "#F1F5F9",
        "muted-foreground": "#64748B",

        accent: "#DBEAFE",
        "accent-foreground": "#1E293B",

        destructive: "#D4183D",

        border: "#BFDBFE",

        sidebar: "#E0ECFF",
        "sidebar-foreground": "#1E293B",
        "sidebar-border": "#BFDBFE",
        "sidebar-accent": "#2563EB",
        "sidebar-accent-foreground": "#FFFFFF",

        "kpi-value": "#000000"
      }
    }
  },

  plugins: []
}
=======
module.exports = {
content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
theme: {
extend: {},
},
plugins: [],
};
>>>>>>> origin/hr
