import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Adarsh Nambiar | Portfolio",
  description: "Web Developer & Computer Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <meta name="apple-mobile-web-app-title" content="Adarsh Nambiar" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web Developer"
        />
        <meta name="author" content="Adarsh Nambiar" />
        <meta name="keywords" content="adarsh nambiar, portfolio, web developer, computer engineer" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@adarshnambiarr" />
        <meta name="twitter:title" content="Adarsh Nambiar | Portfolio" />
        <meta
          name="twitter:description"
          content="Web Developer"
        />
        <meta
          name="twitter:image"
          content="http://localhost:3000/images/logo.svg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Adarsh Nambiar | Portfolio" />
        <meta
          property="og:description"
          content="Web Developer"
        />
        <meta
          property="og:image"
          content="http://localhost:3000/images/logo.svg"
        />
        <meta property="og:url" content="https://adarshnambiar.me" />
        <meta property="og:site_name" content="Adarsh Nambiar" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}