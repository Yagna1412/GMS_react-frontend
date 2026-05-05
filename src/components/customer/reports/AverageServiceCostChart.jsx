import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function AverageServiceCostChart({ services = [] }) {

  const totals = {};
  const counts = {};

  services.forEach((s) => {
    const name = s.serviceName ?? s.service ?? "Unknown";
    if (!totals[name]) { totals[name] = 0; counts[name] = 0; }
    totals[name] += s.amount ?? 0;
    counts[name] += 1;
  });

  const chartData = Object.keys(totals).map((name) => ({
    service: name,
    value: Math.round(totals[name] / counts[name])
  }));

  return (
    <div className="bg-[#FFFFFF] rounded-xl shadow-sm border border-[#BFDBFE] p-6 overflow-hidden">

      <h2 className="text-md font-semibold text-[#1E3A8A] mb-4">
        Average Service Cost
      </h2>

      {!chartData.length ? (
        <div className="flex items-center justify-center h-[250px] text-[#64748B]">
          No data available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >
            <CartesianGrid
              stroke="#E2E8F0"
              strokeDasharray="3 3"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={{ stroke: "#BFDBFE" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="service"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={{ stroke: "#BFDBFE" }}
              tickLine={false}
              width={120}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, "Average Cost"]}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #BFDBFE",
                borderRadius: "8px",
                color: "#1E3A8A"
              }}
            />
            <Bar
              dataKey="value"
              fill="#2b9955"
              radius={[0, 4, 4, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

    </div>
  );
}
