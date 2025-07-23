
"use client";

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, CreditCard, QrCode, Users } from 'lucide-react';
import Footer from '@/components/footer';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { LanguageSwitcher } from '@/components/language-switcher';
import en from '@/data/locales/en.json';
import es from '@/data/locales/es.json';
import supportersData from '@/data/supporters.json';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AnimatedDiv } from '@/components/animated-div';

const locales: { [key: string]: any } = {
  en,
  es,
};

type Supporter = {
    name: string;
}

export default function DonatePage() {
    const [lang, setLang] = React.useState("en");
    const [supporters, setSupporters] = React.useState<Supporter[]>([]);
    const t = React.useMemo(() => locales[lang], [lang]);

    React.useEffect(() => {
        const storedLang = localStorage.getItem("language");
        if (storedLang && locales[storedLang]) {
          setLang(storedLang);
        }
        setSupporters(supportersData);
      }, []);

    const handleLanguageChange = (newLang: string) => {
        setLang(newLang);
        localStorage.setItem("language", newLang);
    };

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
         <AnimatedDiv delay={0.1}>
           <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold font-headline">
                {t.title}
                </span>
            </Link>
            <div className="flex items-center gap-2">
                <LanguageSwitcher
                currentLang={lang}
                onLanguageChange={handleLanguageChange}
                />
                <ThemeToggleButton />
            </div>
            </div>
      </header>
         </AnimatedDiv>
      <main className="flex-1 flex items-center justify-center py-12">
        <AnimatedDiv delay={0.1}>
          <div className="w-full max-w-4xl mx-4 flex flex-col md:flex-row gap-8 items-start">
            <AnimatedDiv delay={0.2}>
              <Card className="w-full md:w-1/2">
              <CardHeader className="text-center">
                  <Heart className="mx-auto h-12 w-12 text-pink-500 mb-4" />
                  <CardTitle className="text-3xl font-headline">{t.donate.title}</CardTitle>
                  <CardDescription>
                  {t.donate.description}
                  </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                  <div className="grid gap-4">
                      <h3 className="font-semibold text-center text-lg flex items-center justify-center gap-2"><QrCode className="h-5 w-5" /> {t.donate.qrTitle}</h3>
                      <div className="flex flex-col items-center gap-2">
                          <Image 
                              src="https://placehold.co/300x300.png"
                              alt="JazzCash QR Code"
                              width={250}
                              height={250}
                              className="rounded-lg border p-1"
                              data-ai-hint="qr code"
                          />
                          <p className="text-sm text-muted-foreground text-center">{t.donate.qrDescription}</p>
                      </div>
                  </div>
                  <Separator />
                  <div className="grid gap-4">
                      <h3 className="font-semibold text-center text-lg flex items-center justify-center gap-2"><CreditCard className="h-5 w-5" /> {t.donate.internationalTitle}</h3>
                      <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      <a href="https://www.buymeacoffee.com/your-username" target="_blank" rel="noopener noreferrer">
                          {t.donate.buyMeACoffee}
                      </a>
                      </Button>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                      {t.donate.redirectMessage}
                      </p>
                      <p className="text-center font-semibold mt-4 text-primary">{t.donate.thanks}</p>
                  </div>
              </CardContent>
              </Card>
            </AnimatedDiv>

            <AnimatedDiv delay={0.4}>
              <Card className="w-full md:w-1/2">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                          <Users className="h-8 w-8 text-primary" />
                          <span className="text-2xl font-headline">{t.donate.supportersTitle}</span>
                      </CardTitle>
                      <CardDescription>
                          {t.donate.supportersDescription}
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="flex flex-wrap gap-3">
                          {supporters.map((supporter, index) => (
                              <Badge key={index} variant="secondary" className="text-base px-4 py-2">
                                  {supporter.name}
                              </Badge>
                          ))}
                      </div>
                  </CardContent>
              </Card>
            </AnimatedDiv>
          </div>
        </AnimatedDiv>
      </main>
      <Footer t={t} />
    </AnimatedDiv>
    </div>
  );
}
