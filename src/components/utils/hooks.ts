import { useState, useEffect, useContext } from 'react';
import { AppContext } from './context';

const PRICE_API_URL = (currency: string) =>
  `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
const PRICE_HISTORY_API_URL = (currency: string) =>
  `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`;

const getApiData = async (url: string) => {
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
};

export const useGetBitcoinPriceAndHistory = (currency: string) => {
  const [price, setPrice] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await Promise.all([
          getApiData(PRICE_API_URL(currency)),
          getApiData(PRICE_HISTORY_API_URL(currency)),
        ]);
        const {
          bpi: {
            [currency]: { rate },
          },
        } = response[0];
        setPrice(rate);

        const { bpi } = response[1];
        setHistory(bpi);
      } catch (error: any) {
        setError(error);
      }
    })();
  }, [currency]);

  return { error, price, history };
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (appContext === undefined) {
    throw new Error('AppContext must be used inside AppContextProvider');
  }

  return appContext;
};
