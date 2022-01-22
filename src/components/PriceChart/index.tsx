import Chart from 'chart.js/auto';
import { useEffect } from 'react';
import { useAppContext, useGetBitcoinPriceAndHistory } from '../utils/hooks';
import { Wrapper } from './styles';

const PriceChart = () => {
  const { selectedCurrency } = useAppContext();
  const { history } = useGetBitcoinPriceAndHistory(selectedCurrency);

  const data = {
    datasets: [
      {
        label: `Price 1 BTC to ${selectedCurrency}`,
        data: history,
        borderColor: 'white',
        backgroundColor: 'green',
        fill: 'start',
      },
    ],
  };

  useEffect(() => {
    const ctx = document.getElementById('priceChart')! as HTMLCanvasElement;
    const chart = new Chart(ctx, {
      type: 'line',
      data,
      options: {},
    });

    return () => chart.destroy && chart.destroy();
  }, [data]);

  return (
    <Wrapper>
      <canvas id="priceChart" width="400" height="400"></canvas>
    </Wrapper>
  );
};

export default PriceChart;
