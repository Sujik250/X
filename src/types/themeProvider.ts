import { ReactNode } from "react";

export type typeThemeContext = {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
};

export type typeThemeProviderProps = {
	children: ReactNode;
};
