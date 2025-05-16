// // import React from 'react';
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from 'chart.js';
// // import { Line } from 'react-chartjs-2';
// // import { faker } from '@faker-js/faker';

// // // Đăng ký các thành phần của ChartJS
// // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// // const options = {
// //   responsive: true,
// //   plugins: {
// //     legend: {
// //       position: 'top',
// //     },
// //     title: {
// //       display: true,
// //       text: 'Biểu đồ đường - Chart.js',
// //     },
// //   },
// // };

// // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// // const generateRandomData = () => labels.map(() => faker.number.int({ min: -1000, max: 1000 }));

// // const data = {
// //   labels,
// //   datasets: [
// //     {
// //       label: 'Dataset 1',
// //       data: generateRandomData(),
// //       borderColor: 'rgb(255, 99, 132)',
// //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
// //     },
// //     {
// //       label: 'Dataset 2',
// //       data: generateRandomData(),
// //       borderColor: 'rgb(53, 162, 235)',
// //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
// //     },
// //   ],
// // };

// // const LineChart = () => <Line options={options} data={data} />;

// // export default LineChart;
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { getRevenueByMonth } from '../../services/admin/dboard';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

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
//       text: 'Biểu đồ doanh thu theo tháng',
//     },
//   },
// };

// const LineChart = () => {
//   const [revenueData, setRevenueData] = useState([]);
//   const [labels, setLabels] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(1); // Gán giá trị mặc định là tháng 1
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Gán giá trị mặc định là năm hiện tại

//   const fetchRevenueData = async (month, year) => {
//     try {
//       const data = await getRevenueByMonth(month, year);
//       const months = data.map(item => `${item.month}/${item.year}`);
//       const revenues = data.map(item => item.total_revenue);

//       setLabels(months);
//       setRevenueData(revenues);
//     } catch (error) {
//       console.error('Error fetching revenue data', error);
//     }
//   };

//   useEffect(() => {
//     fetchRevenueData(selectedMonth, selectedYear); // Lấy dữ liệu doanh thu cho tháng và năm mặc định
//   }, [selectedMonth, selectedYear]); // Fetch lại dữ liệu khi month hoặc year thay đổi

//   const handleMonthChange = (e) => {
//     setSelectedMonth(Number(e.target.value)); // Cập nhật giá trị tháng
//     fetchRevenueData(selectedMonth, selectedYear)
//   };

//   const handleYearChange = (e) => {
//     setSelectedYear(Number(e.target.value)); // Cập nhật giá trị năm
//     fetchRevenueData(selectedMonth, selectedYear);
//   };

//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Doanh thu',
//         data: revenueData,
//         borderColor: 'rgb(75, 192, 192)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       },
//     ],
//   };

//   return (
//     <div>
//       <div className="filters">
//         <select value={selectedMonth} onChange={handleMonthChange}>
//           {[...Array(12)].map((_, index) => (
//             <option key={index} value={index + 1}>
//               Tháng {index + 1}
//             </option>
//           ))}
//         </select>
        
//         <select className='mx-2' value={selectedYear} onChange={handleYearChange}>
//           {[2023, 2024, 2025].map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>

//       <Line options={options} data={data} />
//     </div>
//   );
// };

// export default LineChart;

import React, { useEffect, useState } from 'react';
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
  Filler
} from 'chart.js';
import { getRevenueByMonth } from '../../services/admin/dboard';
import { Card, Form, Row, Col, Spinner } from 'react-bootstrap';
import { FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import '../../assets/styles/RevenueChart.scss'; // Create this CSS file

// Register ChartJS components
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

const RevenueChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);

  const fetchRevenueData = async (month, year) => {
    setIsLoading(true);
    try {
      const data = await getRevenueByMonth(month, year);
      const months = data.map(item => `${item.month}/${item.year}`);
      const revenues = data.map(item => item.total_revenue);

      setLabels(months);
      setRevenueData(revenues);
    } catch (error) {
      console.error('Error fetching revenue data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          },
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'BIỂU ĐỒ DOANH THU',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        },
        padding: 10,
        cornerRadius: 5,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return ` ${context.parsed.y.toLocaleString()} VNĐ`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toLocaleString() + ' VNĐ';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3
      },
      point: {
        radius: 5,
        hoverRadius: 7,
        backgroundColor: '#fff',
        borderWidth: 2
      }
    }
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Doanh thu',
        data: revenueData,
        borderColor: '#4bc0c0',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#4bc0c0'
      }
    ]
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);

  return (
    <Card className="revenue-chart-card shadow-sm">
      <Card.Header className="bg-white d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FaChartLine className="text-primary me-2" size={20} />
          <h5 className="mb-0">Phân tích doanh thu</h5>
        </div>
        <div className="d-flex">
          <Form.Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="me-2 w-130"
            size="md"
            // size="sm"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            size="md"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
        </div>
      </Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <div className="chart-container">
            <Line options={options} data={data} />
          </div>
        )}
      </Card.Body>
      <Card.Footer className="bg-white text-muted small">
        <FaCalendarAlt className="me-1" />
        Cập nhật lúc: {new Date().toLocaleString()}
      </Card.Footer>
    </Card>
  );
};

export default RevenueChart;
