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
import { ResultType } from '@/types';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'oklch(0.488 0.243 264.376)',
  },
} satisfies ChartConfig;

export function PerformanceBarChart({ data }: { data: ResultType[] | undefined }) {
  return (
    <Card className='w-[80%] max-lg:w-full'>
      <CardHeader>
        <CardTitle>Completed CBT Exams</CardTitle>
      </CardHeader>
      <CardContent className='h-[200px] p-6'>
        <ChartContainer config={chartConfig} className='h-full w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={data} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='exam.acronym'
                tickLine={false}
                tickMargin={0}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 8)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey='score' fill='var(--color-desktop)' radius={8}>
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
