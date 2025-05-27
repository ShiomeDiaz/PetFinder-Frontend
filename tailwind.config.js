// /** @type {import('tailwindcss').Config} */
// export const darkMode = ["class"];
// export const content = ["./**/*.{ts,tsx}"];
// export const prefix = "";
// export const theme = {
//   container: {
//     center: true,
//     padding: "2rem",
//     screens: {
//       "2xl": "1400px",
//     },
//   },
//   extend: {
//     colors: {
//             background: {
//         DEFAULT: "#ffffff",
//         dark: "#18181b", // Fondo oscuro global
//       },
//       card: {
//         DEFAULT: "#ffffff",
//         dark: "#23272f", // Card oscuro
//       },
//       text: {
//         DEFAULT: "#111827",
//         dark: "#fafafa",
//       },
//       primary: {
//         DEFAULT: '#F97316',
//         dark: '#EA580C',
//         foreground: '#fafafa',
//       },
//       secondary: {
//         DEFAULT: '#6B7280',
//         foreground: '#111827',
//       },
//       destructive: {
//         DEFAULT: '#EF4444',
//         foreground: '#fafafa',
//       },
//       muted: {
//         DEFAULT: '#F3F4F6',
//         foreground: '#6B7280',
//       },
//       accent: {
//         DEFAULT: '#F9FAFB',
//         foreground: '#111827',
//       },
//       popover: {
//         DEFAULT: '#ffffff',
//         foreground: '#111827',
//       },
//       card: {
//         DEFAULT: '#ffffff',
//         foreground: '#111827',
//       },
//       sidebar: {
//         DEFAULT: '#F9FAFB',
//         foreground: '#4B5563',
//         primary: '#1F2937',
//         'primary-foreground': '#F9FAFB',
//         accent: '#F3F4F6',
//         'accent-foreground': '#1F2937',
//         border: '#E5E7EB',
//         ring: '#3B82F6',
//       },
//       border: '#E5E7EB',
//       input: '#E5E7EB',
//       ring: '#111827',
//       background: '#ffffff',
//       foreground: '#111827',
//     },
//   },
// };
// export const plugins = [require("tailwindcss-animate")];
/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = ["./**/*.{ts,tsx}"];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      background: {
        DEFAULT: "#ffffff",
        dark: "#18181b",
      },
      foreground: {
        DEFAULT: "#18181b",
        dark: "#f4f4f5",
      },
      card: {
        DEFAULT: "#ffffff",
        dark: "#23272f",
        foreground: {
          DEFAULT: "#18181b",
          dark: "#f4f4f5",
        },
      },
      primary: {
        DEFAULT: "#fb923c",
        dark: "#fb923c",
        foreground: "#fff",
        "dark-foreground": "#18181b",
      },
      secondary: {
        DEFAULT: "#f3f4f6",
        dark: "#27272a",
        foreground: "#18181b",
        "dark-foreground": "#f4f4f5",
      },
      muted: {
        DEFAULT: "#f3f4f6",
        dark: "#2a2a2e",
        foreground: "#6b7280",
        "dark-foreground": "#a1a1aa",
      },
      accent: {
        DEFAULT: "#fb923c",
        dark: "#fb923c",
        foreground: "#18181b",
        "dark-foreground": "#18181b",
      },
      destructive: {
        DEFAULT: "#ef4444",
        dark: "#ef4444",
        foreground: "#fff",
        "dark-foreground": "#fff",
      },
      border: {
        DEFAULT: "#e5e7eb",
        dark: "#27272a",
      },
      input: {
        DEFAULT: "#fff",
        dark: "#23272f",
      },
      ring: {
        DEFAULT: "#fb923c",
        dark: "#fb923c",
      },
      sidebar: {
        DEFAULT: "#f9fafb",
        dark: "#18181b",
        foreground: "#4b5563",
        "dark-foreground": "#f4f4f5",
      },
    },
  },
};
export const plugins = [require("tailwindcss-animate")];
