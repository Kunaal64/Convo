"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main className="relative">
      <div className={cn("fixed inset-0 overflow-hidden -z-10", className)}>
        {/* Background gradient - more subtle in light mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950" />
        
        {/* Aurora effect - more subtle in light mode */}
        <div 
          className="absolute -inset-24 opacity-30 dark:opacity-50 transition-opacity duration-300"
          style={{
            backgroundImage:
              'radial-gradient(at 40% 20%, hsla(220, 100%, 74%, 0.3) 0px, transparent 50%),\n               radial-gradient(at 80% 0%, hsla(200, 100%, 56%, 0.3) 0px, transparent 50%),\n               radial-gradient(at 0% 50%, hsla(220, 100%, 93%, 0.3) 0px, transparent 50%),\n               radial-gradient(at 80% 50%, hsla(260, 100%, 76%, 0.3) 0px, transparent 50%),\n               radial-gradient(at 0% 100%, hsla(220, 100%, 77%, 0.3) 0px, transparent 50%),\n               radial-gradient(at 80% 100%, hsla(240, 100%, 70%, 0.3) 0px, transparent 50%),\n               radial-gradient(at 0% 0%, hsla(220, 100%, 76%, 0.3) 0px, transparent 50%)',
            animation: 'aurora 20s ease infinite',
            backgroundSize: '200% 200%',
            backgroundPosition: '50% 50%',
          }}
        />
      </div>
      
      <div
        className={cn(
          "relative flex flex-col min-h-screen items-center justify-center text-foreground",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `
              [--light-gradient:repeating-linear-gradient(100deg,hsla(0,0%,100%,0.9)_0%,hsla(0,0%,100%,0.9)_7%,transparent_10%,transparent_12%,hsla(0,0%,100%,0.9)_16%)]
              [--dark-gradient:repeating-linear-gradient(100deg,hsla(0,0%,0%,0.9)_0%,hsla(0,0%,0%,0.9)_7%,transparent_10%,transparent_12%,hsla(0,0%,0%,0.9)_16%)]
              [--light-aurora:repeating-linear-gradient(100deg,hsla(220,100%,70%,0.2)_10%,hsla(220,100%,80%,0.15)_15%,hsla(220,100%,85%,0.1)_20%,hsla(260,100%,90%,0.08)_25%,hsla(220,100%,80%,0.15)_30%)]
              [--dark-aurora:repeating-linear-gradient(100deg,hsla(220,100%,70%,0.5)_10%,hsla(220,100%,80%,0.4)_15%,hsla(220,100%,85%,0.3)_20%,hsla(260,100%,90%,0.2)_25%,hsla(220,100%,80%,0.4)_30%)]
              [background-image:var(--light-gradient),var(--light-aurora)]
              dark:[background-image:var(--dark-gradient),var(--dark-aurora)]
              [background-size:300%,_200%]
              [background-position:50%_50%,50%_50%]
              filter blur-[10px] dark:invert-0
              after:content-[""] after:absolute after:inset-0 after:[background-image:var(--light-gradient),var(--light-aurora)] 
              after:dark:[background-image:var(--dark-gradient),var(--dark-aurora)]
              after:[background-size:200%,_100%] 
              after:animate-aurora after:[background-attachment:fixed] after:mix-blend-overlay
              pointer-events-none
              absolute -inset-[10px] opacity-70 dark:opacity-50 will-change-transform
              transition-opacity duration-300`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
