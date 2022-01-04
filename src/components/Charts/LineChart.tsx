import Chart from "react-apexcharts";

const LineChart = ({ data }: { data: number[] }) => {
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
