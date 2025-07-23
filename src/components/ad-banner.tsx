"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';

interface AdBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  adSlot: string;
  adClient: string;
}

const AdBanner = ({ adSlot, adClient, className, ...props }: AdBannerProps) => {
  React.useEffect(() => {
    try {
      // The push needs to be wrapped in a timeout to ensure the script has loaded
      setTimeout(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }, 100);
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={cn("my-8 flex justify-center items-center bg-muted/50 min-h-[100px] rounded-lg animate-fade-in", className)} style={{ animationDelay: '1.4s' }} {...props}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100px' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;
