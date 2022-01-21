import React, { useState } from 'react';

const currencies = ['USD', 'EUR', 'CNY', 'JPY', 'PLN'];
const defaultCurrency = currencies[0];

interface IContext {
  currencies: Array<string>;
  defaultCurrency: string;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}

export const AppContext = React.createContext<IContext | undefined>(undefined);
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);

  return (
    <AppContext.Provider
      value={{
        currencies,
        defaultCurrency,
        selectedCurrency,
        setSelectedCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};