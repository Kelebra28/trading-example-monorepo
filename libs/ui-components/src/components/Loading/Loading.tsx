"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn, LoadingProps, variantClasses , sizeClasses } from "@monorepo/utils";

export const Loading = ({
  variant = "spinner",
  size = "md",
  className,
  fullScreen = false,
  message,
}: LoadingProps) => {

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return (
          <div
            className={cn(
              sizeClasses[size],
              variantClasses[variant],
              "border-blue-600",
              className
            )}
          />
        );
      case "dots":
        return (
          <div className={cn(variantClasses[variant], className)}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  sizeClasses[size],
                  "bg-blue-600 rounded-full animate-bounce"
                )}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );
      case "skeleton":
        return (
          <div
            className={cn(
              sizeClasses[size],
              variantClasses[variant],
              className
            )}
          />
        );
    }
  };

  if (fullScreen) {
    return (
      <GlobalLoading>
        {renderLoader()}
        {message && (
          <p className="mt-4 text-gray-600 text-sm font-medium">{message}</p>
        )}
      </GlobalLoading>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {renderLoader()}
      {message && (
        <p className="mt-2 text-gray-600 text-sm font-medium">{message}</p>
      )}
    </div>
  );
};

const GlobalLoading = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    if (!document.getElementById("loading-portal")) {
      const portal = document.createElement("div");
      portal.id = "loading-portal";
      document.body.appendChild(portal);
    }
    setMounted(true);
    return () => {
      const portal = document.getElementById("loading-portal");
      portal?.remove();
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center"
    >
      {children}
    </div>,
    document.getElementById("loading-portal")!
  );
};

export const SkeletonLoader = ({
  className,
  count = 1,
}: {
  className?: string;
  count?: number;
}) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Loading
          key={i}
          variant="skeleton"
          className={cn("mb-2 last:mb-0", className)}
        />
      ))}
    </>
  );
};
