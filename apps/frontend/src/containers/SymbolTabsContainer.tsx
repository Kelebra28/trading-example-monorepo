"use client";
import dynamic from "next/dynamic";
import { useSymbolTabs } from "@/hooks/useSymbolTabs";
import { FC } from "react";

const ClientSymbolTabs = dynamic(
  () => import('@monorepo/ui-components').then((mod) => mod.SymbolTabs),
  { ssr: false }
);

export const SymbolTabsContainer: FC = () => {
  const { currentSymbol, handleSelectSymbol, SymbolPairs } = useSymbolTabs();

  return (
    <ClientSymbolTabs
      currentSymbol={currentSymbol}
      symbolPairs={[...SymbolPairs]}
      onSelectSymbol={handleSelectSymbol}
    />
  );
};
