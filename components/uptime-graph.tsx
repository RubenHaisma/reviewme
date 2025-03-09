'use client';

import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface UptimePoint {
  timestamp: string;
  status: 'up' | 'down' | 'degraded';
}

interface UptimeGraphProps {
  history: UptimePoint[];
}

export function UptimeGraph({ history }: UptimeGraphProps) {
  const statusToValue = (status: string): number => {
    switch (status) {
      case 'up':
        return 100;
      case 'degraded':
        return 50;
      case 'down':
        return 0;
      default:
        return 0;
    }
  };

  const data = {
    labels: history.map(point => new Date(point.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'System Status',
        data: history.map(point => statusToValue(point.status)),
        fill: true,
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: history.map(point => {
          switch (point.status) {
            case 'up':
              return 'rgb(34, 197, 94)';
            case 'degraded':
              return 'rgb(234, 179, 8)';
            case 'down':
              return 'rgb(239, 68, 68)';
            default:
              return 'rgb(156, 163, 175)';
          }
        }),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(tickValue: string | number) {
            const value = Number(tickValue);
            if (value === 100) return 'Up';
            if (value === 50) return 'Degraded';
            if (value === 0) return 'Down';
            return '';
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            if (value === 100) return 'Status: Operational';
            if (value === 50) return 'Status: Degraded';
            return 'Status: Down';
          },
        },
      },
    },
  };

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Line data={data} options={options} />
    </motion.div>
  );
}