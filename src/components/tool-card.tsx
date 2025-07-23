
"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tool } from "@/types";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ToolCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tool: Tool;
  isFeatured?: boolean;
  isGrid?: boolean;
  t?: any;
}

const tagColorMap: { [key: string]: string } = {
  Free: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  Freemium: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  Paid: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  "Add-on": "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  "Open-Source": "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
};

export default function ToolCard({
  tool,
  isFeatured = false,
  isGrid = true,
  className,
  t,
  ...props
}: ToolCardProps) {
  const { toast } = useToast();

  const isNew = React.useMemo(() => {
    const toolDate = new Date(tool.date_added);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - toolDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }, [tool.date_added]);

  const handleVisit = () => {
    try {
      const key = `click-${tool.name}`;
      const count = parseInt(localStorage.getItem(key) || "0", 10);
      localStorage.setItem(key, String(count + 1));
    } catch (error) {
      console.error("Could not update click count in localStorage:", error);
      toast({
        variant: "destructive",
        title: "Could not track click",
        description: "Please ensure your browser allows localStorage.",
      });
    }
    const affiliateUrl = `${tool.url}?ref=aidirectoryhub`;
    window.open(affiliateUrl, "_blank", "noopener,noreferrer");
  };

  if (isFeatured) {
    return (
      <Card
        className={cn("group/feature relative overflow-hidden rounded-3xl border border-gray-200/50 bg-card shadow-xl transition-all duration-500 hover:shadow-primary/50 dark:border-gray-700/50 dark:bg-card-dark", className)}
        {...props}
      >
        <div className="absolute inset-0 z-0">
            <Image
                src="https://placehold.co/1200x600.png"
                alt={`${tool.name} background`}
                fill
                className="object-cover opacity-10 group-hover/feature:opacity-20 transition-opacity duration-500"
                data-ai-hint="abstract gradient"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
            <Image
                src={tool.logo}
                alt={`${tool.name} logo`}
                width={144}
                height={144}
                className="rounded-3xl border-4 border-background/20 shadow-lg shrink-0 transition-transform duration-300 group-hover/feature:scale-105"
                data-ai-hint={tool['data-ai-hint']}
            />
            <div className="flex-1 text-center md:text-left">
                <CardTitle className="font-headline text-4xl md:text-5xl text-primary-foreground leading-tight">
                    {tool.name}
                </CardTitle>
                <CardDescription className="mt-3 text-lg max-w-2xl mx-auto md:mx-0 text-primary-foreground/90">
                    {tool.description}
                </CardDescription>
                <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-3">
                    {tool.tags.map((tag) => (
                        <Badge
                        key={tag}
                        variant="secondary"
                        className={cn("font-medium border-none text-base px-3 py-1", tagColorMap[tag])}
                        >
                        {tag}
                        </Badge>
                    ))}
                    {isNew && (
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1 border-primary/50 bg-primary/10 text-primary dark:bg-primary/20 text-base px-3 py-1"
                        >
                            <Zap className="h-4 w-4" />
                            {t?.tags.new || "New"}
                        </Badge>
                    )}
                </div>
            </div>
            <Button
                size="lg"
                onClick={handleVisit}
                className="shrink-0 group mt-6 md:mt-0 text-lg h-14 px-10 rounded-full shadow-lg transition-transform group-hover/feature:scale-105 bg-primary text-primary-foreground hover:bg-primary/90"
            >
                {t?.visitSite || 'Visit Site'}
                <ArrowUpRight className="h-6 w-6 ml-3 transition-transform group-hover/link:rotate-45" />
            </Button>
        </div>
      </Card>
    );
  }

  if (!isGrid) {
    return (
        <Card className={cn("flex items-center p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border border-gray-200/50 dark:border-gray-700/50", className)} {...props}>
             <Image
                src={tool.logo}
                alt={`${tool.name} logo`}
                width={56}
                height={56}
                className="rounded-xl border-2 border-border shadow-md transition-transform duration-300 group-hover/card:scale-105"
                data-ai-hint={tool['data-ai-hint']}
            />
            <div className="flex-1 ml-4">
                <CardTitle className="text-xl font-headline">{tool.name}</CardTitle>
                 <CardDescription className="text-base line-clamp-1">{tool.description}</CardDescription>
            </div>
             <div className="flex flex-wrap gap-2 mx-4">
                {tool.tags.map((tag) => (
                    <Badge
                    key={tag}
                    variant="secondary"
                    className={cn("font-medium border-none text-sm px-3 py-1", tagColorMap[tag])}
                    >
                    {tag}
                    </Badge>
                ))}
            </div>
            <Button
                size="lg"
                variant="ghost"
                onClick={handleVisit}
                className="shrink-0 group/link h-10 w-10 rounded-full hover:bg-primary hover:text-primary-foreground"
            >
                {t?.visitSite || 'Visit Site'}
                <ArrowUpRight className="h-5 w-5 ml-2 transition-transform group-hover/link:rotate-45" />
            </Button>
        </Card>
    )
  }

  return (
      <Card
        className={cn(
          "group/card flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/50 bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-gray-700/50 dark:bg-card-dark",
          className
        )}
        {...props}
      >
        <CardHeader className="flex flex-row items-start gap-4 p-4 pb-2">
            <div className="relative flex-shrink-0">
                <Image
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    width={64}
                    height={64}
                    className="rounded-xl border-2 border-border shadow-md transition-transform duration-300 group-hover/card:scale-105"
                    data-ai-hint={tool['data-ai-hint']}
                />
                {isNew && (
                    <Badge
                        variant="outline"
                        className="absolute -top-2 -right-2 flex items-center gap-1 rounded-full border-primary/50 bg-primary/10 px-2 py-1 text-xs text-primary dark:bg-primary/20"
                    >
                        <Zap className="h-3 w-3" />
                        {t?.tags.new || "New"}
                    </Badge>
                )}
            </div>
            <div className="flex-1">
                <CardTitle className="font-headline text-xl leading-tight">{tool.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{tool.category}</p>
            </div>
        </CardHeader>
        <CardContent className="flex-grow px-4 pb-4 pt-2">
            <CardDescription className="line-clamp-3 text-base">
                {tool.description}
            </CardDescription>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-2">
             <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                    <Badge
                    key={tag}
                    variant="secondary"
                    className={cn("font-medium border-none", tagColorMap[tag])}
                    >
                    {tag}
                    </Badge>
                ))}
            </div>
             <Button
                variant="ghost"
                size="icon"
                onClick={handleVisit}
                className="h-9 w-9 rounded-full shrink-0 group opacity-0 group-hover/card:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
                <ArrowUpRight className="h-5 w-5" />
            </Button>
        </CardFooter>
      </Card>
  );
}
