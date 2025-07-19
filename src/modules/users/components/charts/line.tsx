'use client';

// import { TrendingUp } from 'lucide-react';
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
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
import { ResultType } from '@/types';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'oklch(0.488 0.243 264.376)',
  },
} satisfies ChartConfig;

export function PerformanceLineChart({
  data,
}: {
  data: ResultType[] | undefined;
}) {
  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>Completed CBT Exams</CardTitle>
      </CardHeader>
      <CardContent className='h-[200px] p-6'>
        <ChartContainer config={chartConfig} className='h-full w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={data} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='exam.acronym'
                tickLine={false}
                tickMargin={0}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 8)}
              />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                type='monotone'
                dataKey='score'
                stroke='var(--color-desktop)'
                strokeWidth={2}
                dot={{ r: 4, fill: 'var(--color-desktop)' }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  position='top'
                  offset={12}
                  className='fill-foreground'
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
