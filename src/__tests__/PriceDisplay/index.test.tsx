import { render, waitFor, fireEvent } from '@testing-library/react';
import PriceDisplay from '../../components/PriceDisplay';
import { mockPriceApiData } from './__mocks__/mockData';
import { AppContextProvider } from '../../components/utils/context';

jest.mock('../../components/utils/hooks', () => ({
  ...jest.requireActual('../../components/utils/hooks'),
  useGetBitcoinPriceAndHistory: (currency: keyof typeof mockPriceApiData) => {
    const { bpi } = mockPriceApiData[currency];

    const rate = bpi[currency as keyof typeof bpi].rate;
    return {
      price: rate,
      error: null,
    };
  },
}));

const setup = () =>
  render(
    <AppContextProvider>
      <PriceDisplay />
    </AppContextProvider>
  );

describe('PriceDisplay component tests', () => {
  it('renders correctly with default currency USD', () => {
    const {
      bpi: {
        USD: { rate },
      },
    } = mockPriceApiData.USD;

    const { getByTestId } = setup();

    const price = getByTestId('price-label');
    expect(price).toHaveTextContent(rate);

    const select = getByTestId('currency-select');
    expect(select).toHaveTextContent('USD');
  });

  it('reflects correct value when currency is changed to EUR', async () => {
    const {
      bpi: {
        EUR: { rate },
      },
    } = mockPriceApiData.EUR;

    const { getByTestId, getByText } = setup();
    const select = getByTestId('currency-select');

    fireEvent.keyDown(select.firstChild!, { key: 'ArrowDown' });

    await waitFor(async () => {
      await fireEvent.click(getByText('EUR'));
    });

    const price = getByTestId('price-label');
    expect(price).toHaveTextContent(rate);
  });
});
