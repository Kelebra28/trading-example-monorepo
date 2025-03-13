"use client";
import dynamic from "next/dynamic";
import { SymbolTabs } from "../../../../libs/ui-components/src";
import { useSymbolTabs } from "@/hooks/useSymbolTabs";
import { FC } from "react";

const ClientSymbolTabs = dynamic(
  () => import('../../../../libs/ui-components/src').then((mod) => mod.SymbolTabs),
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
