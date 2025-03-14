"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SymbolPairs } from "@monorepo/utils";

export const useSymbolTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSymbol = searchParams.get("symbol") || SymbolPairs[0].apiParam;

  const handleSelectSymbol = (symbol: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("symbol", symbol);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return {
    currentSymbol,
    handleSelectSymbol,
    SymbolPairs,
  };
};
