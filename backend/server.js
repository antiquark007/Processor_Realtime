import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const ENDPOINT = "http://localhost:4001";

function App() {
  const [data, setData] = useState({
    cpuUsage: 0,
    freeMem: 0,
    totalMem: 0,
    freeMemPercentage: 0,
    platform: '',
    uptime: 0,
  });

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      setData(data);
    });

    return () => socket.disconnect();
  }, []);

  const cpuData = {
    labels: ['CPU Usage'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [data.cpuUsage],
        backgroundColor: ['rgba(75, 192, 192, 0.6)'],
      },
    ],
  };

  const memData = {
    labels: ['Free Memory', 'Used Memory'],
    datasets: [
      {
        label: 'Memory Usage',
        data: [data.freeMem, data.totalMem - data.freeMem],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div className="App">
      <h1>System Performance Dashboard</h1>
      <div>
        <h2>CPU Usage</h2>
        <Line data={cpuData} />
      </div>
      <div>
        <h2>Memory Usage</h2>
        <Pie data={memData} />
      </div>
    </div>
  );
}

export default App;