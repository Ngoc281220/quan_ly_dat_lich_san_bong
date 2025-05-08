// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';

// // Đăng ký các thành phần của ChartJS
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Biểu đồ đường - Chart.js',
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const generateRandomData = () => labels.map(() => faker.number.int({ min: -1000, max: 1000 }));

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: generateRandomData(),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: generateRandomData(),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// const LineChart = () => <Line options={options} data={data} />;

// export default LineChart;
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getRevenueByMonth } from '../../services/admin/dboard';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Biểu đồ doanh thu theo tháng',
    },
  },
};

const LineChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(1); // Gán giá trị mặc định là tháng 1
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Gán giá trị mặc định là năm hiện tại

  const fetchRevenueData = async (month, year) => {
    try {
      const data = await getRevenueByMonth(month, year);
      const months = data.map(item => `${item.month}/${item.year}`);
      const revenues = data.map(item => item.total_revenue);

      setLabels(months);
      setRevenueData(revenues);
    } catch (error) {
      console.error('Error fetching revenue data', error);
    }
  };

  useEffect(() => {
    fetchRevenueData(selectedMonth, selectedYear); // Lấy dữ liệu doanh thu cho tháng và năm mặc định
  }, [selectedMonth, selectedYear]); // Fetch lại dữ liệu khi month hoặc year thay đổi

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value)); // Cập nhật giá trị tháng
    fetchRevenueData(selectedMonth, selectedYear)
  };

  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value)); // Cập nhật giá trị năm
    fetchRevenueData(selectedMonth, selectedYear);
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Doanh thu',
        data: revenueData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
      <div className="filters">
        <select value={selectedMonth} onChange={handleMonthChange}>
          {[...Array(12)].map((_, index) => (
            <option key={index} value={index + 1}>
              Tháng {index + 1}
            </option>
          ))}
        </select>
        
        <select value={selectedYear} onChange={handleYearChange}>
          {[2023, 2024, 2025].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;