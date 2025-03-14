import { Suspense } from "react";
import { HistoricalDataWrapper } from "../Wrappers/HistoricalDataWrapper";
import { BannerContainer, SymbolTabsContainer } from "@/containers/";
import { Loading } from "@monorepo/ui-components";

const DashboardPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const symbol =
    typeof searchParams?.symbol === "string" ? searchParams.symbol : "AUDUSD";

  return (
    <div className="container py-8 space-y-8">
      <Suspense fallback={<Loading fullScreen message="Loading..." />}>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Currency Dashboard</h1>
          <SymbolTabsContainer />
          <BannerContainer />
        </div>
        <HistoricalDataWrapper symbol={symbol} />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
