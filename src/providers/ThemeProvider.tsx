/**
 * typescript context, provider example
 */

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
