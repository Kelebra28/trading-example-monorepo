"use client";
import { Loading } from "../Loading/Loading";
import { BannerViewModel } from "../../../../utils/src";

export const Banner = ({ viewModel }: { viewModel: BannerViewModel }) => {
  const { pair, pointValue, lastUpdatedTime, error, loading } = viewModel;

  return (
    <div className="bg-card rounded-lg p-6 shadow-md border">
      {loading ? (
        <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-4">
          <Loading variant="spinner" size="lg" message="Loading..." />
        </div>
      ) : (
        <>
          {pair ? (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">{pair}</h1>
                <p className="text-muted-foreground text-sm">
                  Last updated: {lastUpdatedTime || "N/A"}
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground">Point value</span>
                <p className="text-3xl font-mono">{pointValue}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-red-500">No data available</p>
            </div>
          )}
        </>
      )}
      
      {error && (
        <div className="mt-4 animate-fade-in">
          <p className="text-red-500 text-sm">{error}</p>
          <div className="mt-2 flex items-center justify-center">
            <Loading variant="dots" size="sm" message="Reconnecting..." />
          </div>
        </div>
      )}
    </div>
  );
};