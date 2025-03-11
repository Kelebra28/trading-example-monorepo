import { Suspense } from "react";
import {
  Banner,
  SymbolTabs,
} from "../../../../libs/ui-components/src";
import { useCurrencyData, useHistoricalData } from "@/hooks/";
import { HistoricalDataWrapper } from "./Wrappers/HistoricalDataWrapper";


const DashboardPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const symbol =
    typeof searchParams?.symbol === 'string' ? searchParams.symbol : 'AUDUSD';
  
  return (
    <div className="container py-8 space-y-8">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Currency Dashboard</h1>
          <SymbolTabs />
          <Banner useCurrencyData={useCurrencyData} />
        </div>

        <HistoricalDataWrapper symbol={symbol} />
      </Suspense>
    </div>
  );
};

export default DashboardPage;