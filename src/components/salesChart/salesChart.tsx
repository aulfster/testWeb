import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'antd';
import { format, parseISO } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { SalesChartProps } from '../types';
import './salesChart.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const SalesChart: React.FC<SalesChartProps> = ({ salesData }) => {
  const getMonthName = (dateStr: string): string => {
    const date = parseISO(dateStr);
    return format(date, 'MMM').toUpperCase();
  };

  const data = useMemo(() => {
    const labels = salesData.map((data, index, arr) => {
      const month = getMonthName(data.weekEnding);
      const prevMonth =
        index > 0 ? getMonthName(arr[index - 1].weekEnding) : '';
      return month !== prevMonth ? month : '';
    });

    const datasets = [
      {
        label: 'Retail Sales',
        data: salesData.map((data) => data.retailSales),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 3.5,
        tension: 0.5,
        pointStyle: 'circle',
        pointRadius: 0,
      },
      {
        label: 'Wholesale Sales',
        data: salesData.map((data) => data.wholesaleSales),
        borderColor: 'rgb(128, 128, 128)',
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        borderWidth: 3.5,
        tension: 0.5,
        pointStyle: 'circle',
        pointRadius: 0,
      },
    ];

    return { labels, datasets };
  }, [salesData]);

  const options = {
    scales: {
      x: {
        ticks: {
          autoSkip: false, // Prevents Chart.js from automatically skipping ticks
          maxRotation: 0, // Keeps labels horizontal
          minRotation: 0,
          maxTicksLimit: 12, // Limits the maximum number of ticks displayed
          color: '#a6a6a6',
          font: {
            size: 13,
            weight: 300,
            family: 'Poppins',
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Retail Sales',
        position: 'top' as const,
        align: 'start' as const,
        font: {
          size: 17,
          weight: 400,
          family: 'Poppins',
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className='card-container'>
      <Card className='card-responsive' hoverable>
        <div className='chart-container'>
          <Line data={data} options={options} />
        </div>
      </Card>
    </div>
  );
};

export default SalesChart;
