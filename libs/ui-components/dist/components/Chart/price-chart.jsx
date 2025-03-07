'use client';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, TimeScale, } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import React from 'react';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, TimeScale, zoomPlugin);
export const PriceChart = ({ data }) => {
    const chartData = {
        labels: data.map(d => new Date(d.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: 'Closing Price',
                data: data.map(d => d.close),
                borderColor: 'hsl(221.2 83.2% 53.3%)',
                tension: 0.1,
                pointRadius: 2,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            zoom: {
                zoom: {
                    wheel: { enabled: true },
                    pinch: { enabled: true },
                    mode: 'x',
                },
                pan: {
                    enabled: true,
                    mode: 'x',
                },
            },
        },
    };
    return (<div className="h-96 bg-background p-4 rounded-lg border">
      <Line data={chartData} options={options}/>
    </div>);
};
