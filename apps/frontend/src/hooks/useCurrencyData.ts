"use client";
import { useEffect, useState } from "react";
import { WSClient } from "@monorepo/domain";
import { CurrencyData } from "@monorepo/utils/types";

export const useCurrencyData = () => {
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const handleConnect = () => setIsConnecting(false);
    const handleDisconnect = () => setIsConnecting(true);

    WSClient.connect(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
    
    const handleData = (data: CurrencyData) => {
      setCurrencyData(data);
      setLastUpdated(new Date());
      setError(null);
      setIsConnecting(false);
    };

    WSClient.addEventListener('connect', handleConnect);
    WSClient.addEventListener('disconnect', handleDisconnect);
    
    const unsubscribe = WSClient.subscribe(handleData);

    return () => {
      unsubscribe();
      WSClient.removeEventListener('connect', handleConnect);
      WSClient.removeEventListener('disconnect', handleDisconnect);
    };
  }, []);

  return { 
    currencyData, 
    error, 
    lastUpdated, 
    loading: isConnecting || (!currencyData && !error) 
  };
};