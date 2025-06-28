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
      <div
        className={cn(
          "fixed inset-0 overflow-hidden -z-10",
          className
        )}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-900 dark:to-zinc-950" />
        
        {/* Aurora effect */}
        <div 
          className="absolute -inset-24 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 0.5) 0px, transparent 50%),\n               radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.5) 0px, transparent 50%),\n               radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 0.5) 0px, transparent 50%),\n               radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 0.5) 0px, transparent 50%),\n               radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 0.5) 0px, transparent 50%),\n               radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 0.5) 0px, transparent 50%),\n               radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 0.5) 0px, transparent 50%)',
            animation: 'aurora 15s ease infinite',
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
              [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
              [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
              [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
              [background-image:var(--white-gradient),var(--aurora)]
              dark:[background-image:var(--dark-gradient),var(--aurora)]
              [background-size:300%,_200%]
              [background-position:50%_50%,50%_50%]
              filter blur-[10px] invert dark:invert-0
              after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
              after:dark:[background-image:var(--dark-gradient),var(--aurora)]
              after:[background-size:200%,_100%] 
              after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
              pointer-events-none
              absolute -inset-[10px] opacity-50 will-change-transform`,

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
