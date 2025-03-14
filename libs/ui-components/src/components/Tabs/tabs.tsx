"use client";

import { SymbolTabsViewModel } from "@monorepo/utils";

export const SymbolTabs = ({ 
  currentSymbol,
  symbolPairs,
  onSelectSymbol 
}: SymbolTabsViewModel) => {
  return (
    <div className="flex gap-6 mb-8 border-b border-gray-200">
      {symbolPairs.map((pair) => (
        <button
          key={pair.apiParam}
          onClick={() => onSelectSymbol(pair.apiParam)}
          className={`pb-4 px-3 relative transition-all duration-300 ${
            currentSymbol === pair.apiParam
              ? "text-blue-700 font-semibold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-blue-600 after:animate-underline"
              : "text-gray-600 hover:text-blue-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-200 hover:after:w-full after:transition-all duration-300"
          }`}
        >
          {pair.display}
        </button>
      ))}
    </div>
  );
};