"use client"
import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data
const data = [
  { month: "Jan", enrollment: 3150, attendance: 2950 },
  { month: "Feb", enrollment: 3160, attendance: 2940 },
  { month: "Mar", enrollment: 3175, attendance: 2930 },
  { month: "Apr", enrollment: 3180, attendance: 2960 },
  { month: "May", enrollment: 3190, attendance: 2975 },
  { month: "Jun", enrollment: 3200, attendance: 2985 },
  { month: "Jul", enrollment: 3180, attendance: 2970 },
  { month: "Aug", enrollment: 3185, attendance: 2980 },
  { month: "Sep", enrollment: 3195, attendance: 2990 },
  { month: "Oct", enrollment: 3200, attendance: 3000 },
  { month: "Nov", enrollment: 3210, attendance: 3010 },
  { month: "Dec", enrollment: 3220, attendance: 3020 },
]

export function ResultChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#eee"} />
          <XAxis dataKey="month" stroke={isDark ? "#888" : "#444"} tick={{ fill: isDark ? "#888" : "#444" }} />
          <YAxis stroke={isDark ? "#888" : "#444"} tick={{ fill: isDark ? "#888" : "#444" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#fff",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              color: isDark ? "#e5e7eb" : "#374151",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="enrollment"
            name="Enrollment"
            stroke="#2563eb"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line type="monotone" dataKey="attendance" name="Attendance" stroke="#16a34a" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

