'use client';

// import { TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { month: 'July', desktop: 192 },
  { month: 'August', desktop: 256 },
  { month: 'September', desktop: 178 },
  { month: 'October', desktop: 310 },
  { month: 'November', desktop: 245 },
  { month: 'December', desktop: 289 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'oklch(0.488 0.243 264.376)',
  },
} satisfies ChartConfig;

export function PerformanceBarChart() {
  return (
    <Card className='w-[80%] max-lg:w-full'>
      <CardHeader>
        <CardTitle>Completed CBT Exams</CardTitle>
      </CardHeader>
      <CardContent className='h-[200px] p-6'>
        <ChartContainer config={chartConfig} className='h-full w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={chartData} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey='desktop' fill='var(--color-desktop)' radius={8}>
                <LabelList
                  position='top'
                  offset={12}
                  className='fill-foreground'
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
