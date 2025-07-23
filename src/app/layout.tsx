"use client";


import './globals.css';
import { ThemeProvider } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';





import { useState } from "react";
import Footer from "@/components/footer";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { Rocket } from "lucide-react";
import { AnimatedDiv } from "@/components/animated-div";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [lang, setLang] = useState("en");

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
        {/* Placeholder for Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_CLIENT_ID"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <AnimatedDiv delay={0.1}>
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm shadow-md">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <a href="#" className="flex items-center gap-2">
                  <Rocket className="h-7 w-7 text-primary" />
                  <span className="text-xl font-bold font-headline">
                    AIDirectoryHub
                  </span>
                </a>
                <div className="flex items-center gap-2">
                  <LanguageSwitcher currentLang={lang} onLanguageChange={handleLanguageChange} />
                  <ThemeToggleButton />
                </div>
              </div>
            </header>
          </AnimatedDiv>
            <AnimatedDiv delay={0.2}>
              <main className="flex-1">{children}</main>
            </AnimatedDiv>
            <AnimatedDiv delay={0.3}>
              <Footer t={{}} />
            </AnimatedDiv>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
