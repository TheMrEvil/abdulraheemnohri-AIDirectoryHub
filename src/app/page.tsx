"use client";

import * as React from "react";
import Image from "next/image";
import {
  Code,
  FileText,
  GanttChartSquare,
  Image as ImageIcon,
  LayoutGrid,
  List,
  Music,
  Rocket,
  Search,
  Video,
  X,
} from "lucide-react";

import allToolsData from "@/data/tools.json";
import allCategoriesData from "@/data/categories.json";
import type { Tool, Category } from "@/types";
import { cn } from "@/lib/utils";
import { Icon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToolCard from "@/components/tool-card";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import Footer from "@/components/footer";
import { LanguageSwitcher } from "@/components/language-switcher";
import AdBanner from "@/components/ad-banner";
import { AnimatedDiv } from "@/components/animated-div";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


// Locales
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";

const locales: { [key: string]: any } = {
  en,
  es,
};

const TOOLS_PER_PAGE = 12;

export default function AIDirectoryHubPage() {
  const [tools, setTools] = React.useState<Tool[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [popularTools, setPopularTools] = React.useState<Tool[]>([]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [isGrid, setIsGrid] = React.useState(true);
  const [lang, setLang] = React.useState("en");
  const [visibleToolsCount, setVisibleToolsCount] = React.useState(TOOLS_PER_PAGE);

  const t = React.useMemo(() => locales[lang], [lang]);

  React.useEffect(() => {
    const typedTools: Tool[] = allToolsData as Tool[];
    const typedCategories: Category[] = allCategoriesData as Category[];

    setTools(typedTools);
    setCategories(typedCategories);

    if (typeof window !== 'undefined') { // Ensure localStorage is only accessed on the client-side
      // Determine popular tools
      const toolsWithClickCounts = typedTools.map(tool => {
          try {
              const count = parseInt(localStorage.getItem(`click-${tool.name}`) || '0', 10);
              return { ...tool, clicks: count };
          } catch (error) {
              return { ...tool, clicks: 0 };
          }
      });

      toolsWithClickCounts.sort((a, b) => b.clicks - a.clicks);
      
      const top5Popular = toolsWithClickCounts.slice(0, 5);

      // Fallback if no tools have clicks
      if (top5Popular.length > 0 && top5Popular[0].clicks > 0) {
          setPopularTools(top5Popular);
      } else {
          // Fallback to 5 most recent tools if no clicks are tracked
          const sortedByDate = [...typedTools].sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime());
          setPopularTools(sortedByDate.slice(0, 5));
      }
      
      const storedLang = localStorage.getItem("language");
      if (storedLang && locales[storedLang]) {
        setLang(storedLang);
      }
    }
  }, []);
  
  React.useEffect(() => {
    setVisibleToolsCount(TOOLS_PER_PAGE);
  }, [selectedCategory, searchTerm]);

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  const searchSuggestions = React.useMemo(() => {
    if (!searchTerm) return [];
    return tools
      .filter((tool) =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5);
  }, [searchTerm, tools]);

  const filteredTools = React.useMemo(() => {
    return tools
      .filter((tool) => {
        const matchesCategory =
          selectedCategory === "All" || tool.category === selectedCategory;
        const matchesSearch = tool.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort(
        (a, b) =>
          new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
      );
  }, [tools, selectedCategory, searchTerm]);

  const visibleTools = React.useMemo(() => {
    return filteredTools.slice(0, visibleToolsCount);
  }, [filteredTools, visibleToolsCount]);

  const handleLoadMore = () => {
    setVisibleToolsCount(prevCount => prevCount + TOOLS_PER_PAGE);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
      <AnimatedDiv delay={0.1}>
        <main className="flex-1">
        <section className="relative border-b py-20 text-center overflow-hidden bg-gradient-to-br from-secondary/30 to-background">
          <div className="absolute inset-0 z-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom_1px_center"></div>
          <div className="container relative mx-auto px-4">
            <AnimatedDiv delay={0}>
              <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
                {t.hero.title}
              </h1>
            </AnimatedDiv>
            <AnimatedDiv delay={0.2}>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                {t.hero.subtitle}
              </p>
            </AnimatedDiv>
            <AnimatedDiv delay={0.4}>
              <div className="relative mx-auto mt-8 max-w-xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t.hero.searchPlaceholder}
                  className="w-full rounded-full bg-background/80 py-6 pl-12 pr-6 text-lg shadow-lg focus:shadow-xl focus:border-primary transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  suppressHydrationWarning
                />
                {searchSuggestions.length > 0 && (
                  <div className="absolute top-full z-10 mt-2 w-full rounded-lg border bg-popover p-2 shadow-xl animate-slide-down-fade">
                    {searchSuggestions.map((tool) => (
                      <button
                        key={tool.name}
                        className="flex w-full items-center gap-3 rounded-md p-3 text-left hover:bg-muted transition-colors duration-200"
                        onClick={() => {
                          setSearchTerm(tool.name);
                        }}
                      >
                        <Image
                          src={tool.logo}
                          alt={`${tool.name} logo`}
                          width={24}
                          height={24}
                          className="rounded-sm"
                          data-ai-hint={tool['data-ai-hint']}
                        />
                        <span>{tool.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedDiv>
          </div>
        </section>

        {popularTools.length > 0 && !searchTerm && selectedCategory === "All" && (
           <AnimatedDiv delay={0.8}>
             <h2 className="mb-8 text-3xl font-bold font-headline text-center">
              {t.featuredTool}
            </h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {popularTools.map((tool, index) => (
                  <CarouselItem key={index} className="p-0">
                    <div className="p-1 h-full">
                      <ToolCard tool={tool} className="h-full" t={t} isFeatured />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="transition-all duration-300 hover:scale-110" />
              <CarouselNext className="transition-all duration-300 hover:scale-110" />
            </Carousel>
          </AnimatedDiv>
        )}
        
        <AnimatedDiv delay={1.4}>
          <AdBanner adSlot="YOUR_AD_SLOT_1" adClient="ca-pub-YOUR_ADSENSE_CLIENT_ID" />
        </AnimatedDiv>

        <section className="container mx-auto px-4 py-16">
          <div className="mb-12">
            <AnimatedDiv delay={0.2}>
              <h2 className="mb-4 text-center text-2xl font-bold font-headline">
                {t.categories.title}
              </h2>
            </AnimatedDiv>
            <AnimatedDiv delay={0.4}>
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant={selectedCategory === 'All' ? 'secondary' : 'outline'}
                  className="rounded-full transition-all duration-200 hover:scale-105"
                  onClick={() => setSelectedCategory('All')}
                >
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  {t.categories.allTools}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? 'secondary' : 'outline'}
                    className="rounded-full transition-all duration-200 hover:scale-105"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <Icon name={category.icon as any} className="h-4 w-4 mr-2" />
                    {t.categories[category.name.toLowerCase()]}
                  </Button>
                ))}
              </div>
            </AnimatedDiv>
          </div>
          
          <AnimatedDiv delay={0.6}>
            <AdBanner adSlot="YOUR_AD_SLOT_2" adClient="ca-pub-YOUR_ADSENSE_CLIENT_ID" />
          </AnimatedDiv>

          <div>
            <div className="mb-8 flex items-center justify-between">
              <AnimatedDiv delay={0.8}>
                <h2 className="text-3xl font-bold font-headline">
                  {selectedCategory === "All" ? t.categories.allTools : t.categories[selectedCategory.toLowerCase()]}
                </h2>
              </AnimatedDiv>
              <AnimatedDiv delay={1}>
                <div className="hidden items-center gap-2 md:flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsGrid(true)}
                    className={cn(isGrid && "bg-muted text-primary", "transition-all duration-300 hover:scale-110")}
                  >
                    <LayoutGrid className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsGrid(false)}
                    className={cn(!isGrid && "bg-muted text-primary", "transition-all duration-300 hover:scale-110")}
                  >
                    <List className="h-5 w-5" />
                  </Button>
                </div>
              </AnimatedDiv>
            </div>

            {visibleTools.length > 0 ? (
              <>
                <div
                  className={cn(
                    "transition-all",
                    isGrid
                      ? "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                      : "flex flex-col gap-4"
                  )}
                >
                  {visibleTools.map((tool, i) => (
                    <AnimatedDiv key={tool.name} delay={i * 0.05}>
                      <ToolCard
                        tool={tool}
                        isGrid={isGrid}
                        className="h-full"
                        t={t}
                      />
                    </AnimatedDiv>
                  ))}
                </div>
                {visibleToolsCount < filteredTools.length && (
                  <AnimatedDiv delay={visibleTools.length * 0.05}>
                    <div className="mt-12 flex justify-center">
                      <Button onClick={handleLoadMore} size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        {t.loadMore || 'Load More'}
                      </Button>
                    </div>
                  </AnimatedDiv>
                )}
              </>
            ) : (
              <AnimatedDiv delay={0.8}>
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 p-12 text-center">
                  <X className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">{t.noTools.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t.noTools.message}
                  </p>
                </div>
              </AnimatedDiv>
            )}
          </div>
        </section>
      </main>
      </AnimatedDiv>
    </div>
  );
}
