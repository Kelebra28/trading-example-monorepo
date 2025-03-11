'use client'
import { useEffect, useState } from 'react';
import 'dotenv/config'
import { WSClient } from '../../../../libs/domain/src';
import { CurrencyData } from '../../../../libs/utils/src';


export const useCurrencyData = () => {
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    WSClient.connect(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
    const handleData = (data: CurrencyData) => {
      setCurrencyData(data);
      setLastUpdated(new Date());
      setError(null);
    };

    const unsubscribe = WSClient.subscribe(handleData);

    return () => {
      unsubscribe();
    };
  }, []);

  return { currencyData, error, lastUpdated };
};