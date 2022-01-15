import Chart from "react-apexcharts";

const LineChart = ({ data, isPositive }: { data: number[]; isPositive: boolean }) => {
  const color = isPositive ? "#4caf50" : "#f44336";
  const options = {
    chart: {
      selection: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: [color],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
      onItemHover: {
        highlightDataSeries: false,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: false,
      marker: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  return <Chart type="line" options={options} series={[{ data }]} height="70px" />;
};

export default LineChart;
