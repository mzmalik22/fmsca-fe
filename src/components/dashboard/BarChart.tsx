import { Box } from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { DataItem } from "../../services/db";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

type BarChartProps = {
  data: DataItem[];
};

function BarChart(props: BarChartProps) {
  const { data } = props;

  const [chartData, setChartData] = useState<{
    series: ApexOptions["series"];
    options: ApexOptions;
  }>({
    series: [],
    options: {},
  });

  useEffect(() => {
    const processChartData = () => {
      const monthlyCounts: { [key: string]: number } = {};

      data.forEach((company) => {
        const date = dayjs(company.out_of_service_date);
        const monthYear = date.format("MMMM YYYY");

        if (monthlyCounts[monthYear]) {
          monthlyCounts[monthYear]++;
        } else {
          monthlyCounts[monthYear] = 1;
        }
      });

      const series = [
        {
          name: "Companies Out of Service",
          data: Object.values(monthlyCounts),
        },
      ];

      const labels = Object.keys(monthlyCounts);

      setChartData({
        series: series,
        options: {
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories: labels,
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + " companies";
              },
            },
          },
        },
      });
    };

    processChartData();
  }, [data]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ color: (theme) => theme.palette.primary.main, padding: 2 }}>
        <h2>Bar Chart (Out of Service Companies)</h2>
      </Box>
      <Box sx={{ width: "100%" }}>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
          width="100%"
        />
        <div id="html-dist"></div>
      </Box>
    </Box>
  );
}

export default BarChart;
