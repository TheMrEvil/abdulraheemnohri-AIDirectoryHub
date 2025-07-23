import * as React from 'react';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { AnimatedDiv } from '@/components/animated-div';

export default function Footer({ t, children }: { t: any, children?: React.ReactNode }) {
  return (
    <AnimatedDiv delay={1.2}>
      <footer className="border-t bg-background/50 py-8">
        <div className="container mx-auto flex flex-col sm:flex-row h-auto sm:h-20 items-center justify-between gap-4 px-4 py-6 sm:py-0 text-sm text-muted-foreground mt-8">
          <p>&copy; {new Date().getFullYear()} {t?.title || 'AIDirectoryHub'}. {t?.footer?.rights || 'All rights reserved'}.</p>
          <p>
            {t?.footer?.builtWith || 'Built with ❤️ using Next.js and Tailwind CSS'}
          </p>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bg-pink-100 text-pink-700 hover:bg-pink-200 hover:text-pink-800 dark:bg-pink-900/50 dark:text-pink-300 dark:hover:bg-pink-900 dark:hover:text-pink-200 border-pink-200 dark:border-pink-800/50"
          >
            <Link href="/donate">
              <Heart className="h-4 w-4 mr-2" />
              Support Us
            </Link>
          </Button>
        </div>
        {children}
      </footer>
    </AnimatedDiv>
  );
}
