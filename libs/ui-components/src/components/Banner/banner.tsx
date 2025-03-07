'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { CurrencyData, WSClient } from '../../../../utils/src';

export const Banner = () => {
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    WSClient.connect('wss://fe-challenge.cicadatech.net/live-data');
    const handleData = (data: CurrencyData) => {
      setCurrencyData(data);
      setLastUpdated(new Date());
      setError(null);
    };

    const handleError = (err: any) => {
      setError('Failed to connect to live data feed');
    };

    const unsubscribe = WSClient.subscribe(handleData);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="bg-card rounded-lg p-6 shadow-md border">
      {currencyData ? (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{currencyData.pair}</h1>
            <p className="text-muted-foreground text-sm">
              Last updated: {lastUpdated?.toLocaleTimeString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-mono">{currencyData.point.toFixed(2)}</p>
            <span className="text-sm text-muted-foreground">
              Point value
            </span>
          </div>
        </div>
      ) : (
        <div className="animate-pulse space-y-2">
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-1/3"></div>
        </div>
      )}
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};