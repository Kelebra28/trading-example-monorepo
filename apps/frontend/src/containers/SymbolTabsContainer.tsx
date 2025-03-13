"use client";

import { SymbolTabs } from "../../../../libs/ui-components/src";
import { useSymbolTabs } from "@/hooks/useSymbolTabs";
import { FC } from "react";

export const SymbolTabsContainer: FC = () => {
  const { currentSymbol, handleSelectSymbol, SymbolPairs } = useSymbolTabs();

  return (
    <SymbolTabs
      currentSymbol={currentSymbol}
      symbolPairs={[...SymbolPairs]}
      onSelectSymbol={handleSelectSymbol}
    />
  );
};
