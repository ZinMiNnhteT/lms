"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "An interactive area chart"

const dummyEnrollmentData = [
  { date: "2024-04-01", enrollments: 222 },
  { date: "2024-04-02", enrollments: 97 },
  { date: "2024-04-03", enrollments: 167 },
  { date: "2024-04-04", enrollments: 242 },
  { date: "2024-04-05", enrollments: 373 },
  { date: "2024-04-06", enrollments: 301 },
  { date: "2024-04-07", enrollments: 245 },
  { date: "2024-04-08", enrollments: 409 },
  { date: "2024-04-09", enrollments: 59 },
  { date: "2024-04-10", enrollments: 261 },
  { date: "2024-04-11", enrollments: 327 },
  { date: "2024-04-12", enrollments: 292 },
  { date: "2024-04-13", enrollments: 342 },
  { date: "2024-04-14", enrollments: 137 },
  { date: "2024-04-15", enrollments: 120 },
  { date: "2024-04-16", enrollments: 138 },
  { date: "2024-04-17", enrollments: 446 },
  { date: "2024-04-18", enrollments: 364 },
  { date: "2024-04-19", enrollments: 243 },
  { date: "2024-04-20", enrollments: 89 },
  { date: "2024-04-21", enrollments: 137 },
  { date: "2024-04-22", enrollments: 224 },
  { date: "2024-04-23", enrollments: 138 },
  { date: "2024-04-24", enrollments: 387 },
  { date: "2024-04-25", enrollments: 215 },
  { date: "2024-04-26", enrollments: 75 },
  { date: "2024-04-27", enrollments: 383 },
  { date: "2024-04-28", enrollments: 122 },
  { date: "2024-04-29", enrollments: 315 },
  { date: "2024-04-30", enrollments: 454 },
  { date: "2024-05-01", enrollments: 165 },
]

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "var(--chart-1)",
  }
} satisfies ChartConfig

interface ChartAreaInteractiveProps {
  data: { date: string; enrollments: number }[];
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {

  const totalEnrollmentNumber = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.enrollments, 0), [data]
  );
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Enrollments for the last 30 days: {totalEnrollmentNumber}
          </span>
          <span className="@[540px]/card:hidden">
            Last 30 days: {totalEnrollmentNumber}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            data={data}
            margin={{
              top: 12,
              right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={"preserveStartEnd"}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                } 
              />

              <Bar dataKey={"enrollments"} fill="var(--color-enrollments)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
