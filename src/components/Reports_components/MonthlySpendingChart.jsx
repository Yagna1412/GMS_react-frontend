import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function MonthlySpendingChart({ services }) {

  const monthlyTotals = {};

  services.forEach((service) => {
    const date = new Date(service.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
    }

    monthlyTotals[month] += service.amount;
  });

  const chartData = Object.keys(monthlyTotals).map((month) => ({
    month,
    amount: monthlyTotals[month]
  }));

  return (
    <div className="bg-[#FFFFFF] rounded-xl shadow-sm border border-[#BFDBFE] p-6 overflow-hidden">

      <h2 className="text-md font-semibold text-[#1E3A8A] mb-4">
        Monthly Spending
      </h2>

      <ResponsiveContainer width="100%" height={250}>

        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >

          <CartesianGrid
            stroke="#E2E8F0"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{ fill: "#64748B", fontSize: 12 }}
            axisLine={{ stroke: "#BFDBFE" }}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#64748B", fontSize: 12 }}
            axisLine={{ stroke: "#BFDBFE" }}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #BFDBFE",
              borderRadius: "8px",
              color: "#1E3A8A"
            }}
          />

          <Bar
            dataKey="amount"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            barSize={30}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}