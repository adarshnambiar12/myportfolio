declare module 'next-themes' {
    export interface ThemeProviderProps {
      children: React.ReactNode;
      attribute?: string;
      defaultTheme?: string;
      enableSystem?: boolean;
      disableTransitionOnChange?: boolean;
      themes?: string[];
      forcedTheme?: string;
      storageKey?: string;
    }
    
    export function ThemeProvider(props: ThemeProviderProps): JSX.Element;
    
    export function useTheme(): {
      theme: string | undefined;
      setTheme: (theme: string) => void;
      forcedTheme: string | undefined;
      resolvedTheme: string | undefined;
      themes: string[];
      systemTheme: string | undefined;
    };
  }