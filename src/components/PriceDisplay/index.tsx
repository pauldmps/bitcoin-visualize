import Select from 'react-select';
import { useAppContext, useGetBitcoinPriceAndHistory } from '../utils/hooks';

import { Wrapper, PriceWrapper, CurrencyWrapper } from './styles';

const PriceDisplay = () => {
  const { currencies, defaultCurrency, selectedCurrency, setSelectedCurrency } =
    useAppContext();
  const { error, price } = useGetBitcoinPriceAndHistory(selectedCurrency);

  const handleChange = (value: string) => {
    setSelectedCurrency(value);
  };

  if (error) {
    return <Wrapper>{`An error has occurred: ${error}`}</Wrapper>;
  }

  return (
    <Wrapper>
      <PriceWrapper>{price}</PriceWrapper>
      <CurrencyWrapper>
        <Select
          options={currencies.map((currency) => ({
            label: currency,
            value: currency,
          }))}
          defaultValue={{ label: defaultCurrency, value: defaultCurrency }}
          onChange={(option) => option?.value && handleChange(option?.value)}
        />
      </CurrencyWrapper>
    </Wrapper>
  );
};

export default PriceDisplay;
