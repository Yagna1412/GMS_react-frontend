import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function MonthlySpendingChart({ chartData = [] }) {

  const data = chartData.map(d => {
    const rawAmount = d.totalAmount ?? d.total ?? d.amount ?? d.spending ?? d.totalSpending ?? 0;
    const amount = Number(rawAmount);
    const monthStr = d.month ?? d.monthYear ?? d.date ?? "";
    let month = monthStr;
    try {
      if (monthStr && monthStr.length >= 7) {
        month = new Date(monthStr.slice(0, 7) + "-01").toLocaleString("default", { month: "short", year: "2-digit" });
      }
    } catch (e) { month = monthStr; }
    return { month, amount };
  });

  return (
    <div className="bg-[#FFFFFF] rounded-xl shadow-sm border border-[#BFDBFE] p-6 overflow-hidden">

      <h2 className="text-md font-semibold text-[#1E3A8A] mb-4">
        Monthly Spending
      </h2>

      {!data.length ? (
        <div className="flex items-center justify-center h-[250px] text-[#64748B]">
          No spending data available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
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
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #BFDBFE",
                borderRadius: "8px",
                color: "#1E3A8A"
              }}
              formatter={(value) => [`$${value}`, "Amount"]}
            />
            <Bar
              dataKey="amount"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

    </div>
  );
}
