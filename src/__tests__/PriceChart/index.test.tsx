import 'jest-canvas-mock';
import { render } from '@testing-library/react';
import PriceChart from '../../components/PriceChart';
import { mockHistoryApiData } from './__mocks__/mockData';
import { AppContextProvider } from '../../components/utils/context';

jest.mock('../../components/utils/hooks', () => ({
  ...jest.requireActual('../../components/utils/hooks'),
  useGetBitcoinPriceAndHistory: () => {
    return {
      history: mockHistoryApiData.bpi,
    };
  },
}));

jest.mock('chart.js/auto', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const setup = () =>
  render(
    <AppContextProvider>
      <PriceChart />
    </AppContextProvider>
  );

describe('PriceChart component tests', () => {
  it('it renders correctly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
