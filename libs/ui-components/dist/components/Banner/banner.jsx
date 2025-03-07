'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { WSClient } from '@repo/ws-client';
export const Banner = () => {
    const [currency, setCurrency] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        try {
            WSClient.connect('wss://fe-challenge.cicadatech.net/live-data');
            const unsubscribe = WSClient.subscribe((data) => {
                setCurrency(data);
                setError(null);
            });
            return () => unsubscribe();
        }
        catch (err) {
            setError('Failed to connect to live data feed');
        }
    }, []);
    return (<div className="bg-card rounded-lg p-6 shadow-md border">
      {currency ? (<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{currency.name}</h1>
            <p className="text-muted-foreground text-sm">
              {new Date(currency.timestamp).toLocaleTimeString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-mono">${currency.rate.toFixed(2)}</p>
            <span className={`text-sm ${currency.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {currency.change >= 0 ? '↑' : '↓'} {Math.abs(currency.change).toFixed(2)}%
            </span>
          </div>
        </div>) : (<div className="animate-pulse space-y-2">
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-1/3"></div>
        </div>)}
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>);
};
