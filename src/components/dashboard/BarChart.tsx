import { Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { DataItem } from "../../services/db";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

type BarChartProps = {
  data: DataItem[];
};

function BarChart(props: BarChartProps) {
  const { data } = props;

  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const monthlyCounts: { [key: string]: number } = {};

    data.forEach((company) => {
      if (!company.out_of_service_date) return;

      const date = dayjs(company.out_of_service_date);
      const monthYear = date.format("MMMM YYYY");

      if (monthlyCounts[monthYear]) monthlyCounts[monthYear]++;
      else monthlyCounts[monthYear] = 1;
    });

    setSeriesData(Object.values(monthlyCounts));
    setLabels(Object.keys(monthlyCounts));
  }, [data]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ color: (theme) => theme.palette.primary.main, padding: 2 }}>
        <h2>Bar Chart (Out of Service Companies)</h2>
      </Box>
      <Box sx={{ width: "100%" }}>
        <ReactApexChart
          series={[
            {
              name: "Companies Out of Service",
              data: seriesData,
            },
          ]}
          options={{
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
          }}
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
