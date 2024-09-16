import { ThemeProvider, useTheme } from "../providers/ThemeProvider";

const ThemeDisplay: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 w-full my-4 text-left	${
        theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      <h2 className="text-xl font-bold">
        Current Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </h2>
      <pre>
        {`
          // tailwind.config.js
          export default {
            content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
            darkMode: "class", // Enable class-based dark mode
            theme: {
              extend: {
                colors: {
                  brand: brandColor,

                  // light theme
                  light: {
                    background: "#ffffff",
                    text: "#000000",
                  },

                  // dark theme
                  dark: {
                    background: "#333333",
                    text: "#ffffff",
                  },
                },
              },
            },
            plugins: [],
          };
          `}
      </pre>
    </div>
  );
};

const ThemedButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded ${
        theme === "light" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
      }`}
    >
      Toggle Theme to {theme === "light" ? "Dark" : "Light"}
    </button>
  );
};

function ThemeContextPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Theme Context for Theme Management
      </h1>
      <ThemeProvider>
        <div className="flex flex-col items-center my-6">
          <ThemedButton />
          <ThemeDisplay />

          <div className="text-left">
            <h2 className="text-xl font-bold">Context and Provider</h2>
            <pre>
              {`
              // ThemeProvider.tsx
              import {
                createContext,
                ReactNode,
                useContext,
                useEffect,
                useState,
              } from "react";

              interface ThemeContextType {
                theme: string;
                toggleTheme: () => void;
              }

              const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

              interface ThemeProviderType {
                children: ReactNode;
              }

              // Sync With TailwindCSS Theme
              const useSyncTailwindTheme = (theme: string) => {
                useEffect(() => {
                  if (theme === "dark") {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                }, [theme]);
              };

              const ThemeProvider: React.FC<ThemeProviderType> = ({ children }) => {
                const [theme, setTheme] = useState("light");
                useSyncTailwindTheme(theme);

                const toggleTheme = () => {
                  setTheme((prev) => (prev === "light" ? "dark" : "light"));
                };

                return (
                  <ThemeContext.Provider value={{ theme, toggleTheme }}>
                    {children}
                  </ThemeContext.Provider>
                );
              };

              const useTheme = () => {
                const context = useContext(ThemeContext);
                if (!context) {
                  throw new Error("useTheme must be used with a ThemeProvider");
                }

                return context;
              };

              export { ThemeProvider, useTheme };

              `}
            </pre>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default ThemeContextPage;
