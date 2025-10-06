"use client";

import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../components/ui/select";
import AppLayout from "../layout";

export default function CheckinChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const [selectedRange, setSelectedRange] = useState<
    "daily" | "weekly" | "monthly"
  >("weekly");

  // Sample datasets
  const chartData = {
    daily: [
      { name: "00:00", value: 100 },
      { name: "04:00", value: 180 },
      { name: "08:00", value: 230 },
      { name: "12:00", value: 300 },
      { name: "16:00", value: 200 },
      { name: "20:00", value: 250 },
      { name: "24:00", value: 180 },
    ],
    weekly: [
      { name: "Mon", value: 820 },
      { name: "Tue", value: 932 },
      { name: "Wed", value: 901 },
      { name: "Thu", value: 934 },
      { name: "Fri", value: 1290 },
      { name: "Sat", value: 1330 },
      { name: "Sun", value: 1320 },
    ],
    monthly: [
      { name: "Week 1", value: 4000 },
      { name: "Week 2", value: 4800 },
      { name: "Week 3", value: 5300 },
      { name: "Week 4", value: 6100 },
    ],
  };

  // Initialize chart once
  useEffect(() => {
    if (chartRef.current && !chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }

    const chart = chartInstanceRef.current!;
    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  // Update chart when data changes
  useEffect(() => {
    const chart = chartInstanceRef.current;
    if (!chart) return;

    const currentData = chartData[selectedRange];

    const option: echarts.EChartsOption = {
      tooltip: { trigger: "axis" },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: currentData.map((d) => d.name),
      },
      yAxis: { type: "value" },
      series: [
        {
          name: "Check-ins",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: { width: 3 },
          itemStyle: { color: "#3b82f6" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(59,130,246,0.4)" },
              { offset: 1, color: "rgba(59,130,246,0.05)" },
            ]),
          },
          data: currentData.map((d) => d.value),
        },
      ],
    };

    chart.setOption(option, true);
  }, [selectedRange]);

  return (
    <AppLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Reports
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Weekly check-in analytics.
          </p>
        </header>

      <Card className="w-full shadow-lg hover:shadow-xl transition">
          <CardHeader className="flex sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle>Check-in Trends</CardTitle>

            <Select
              value={selectedRange}
              onValueChange={(value: "daily" | "weekly" | "monthly") =>
                setSelectedRange(value)
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent>
            <div
              ref={chartRef}
              id="checkin-chart"
              className="h-[350px] w-full transition-all duration-300"
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}