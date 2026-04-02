
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function AverageServiceCostChart({ services }) {

  const serviceTotals = {};
  const serviceCounts = {};

  services.forEach((service) => {

    if (!serviceTotals[service.service]) {
      serviceTotals[service.service] = 0;
      serviceCounts[service.service] = 0;
    }

    serviceTotals[service.service] += service.amount;
    serviceCounts[service.service] += 1;

  });

  const chartData = Object.keys(serviceTotals).map((name) => ({
    service: name,
    value: Math.round(serviceTotals[name] / serviceCounts[name])
  }));


  return (
    <div className="bg-[#FFFFFF] rounded-xl shadow-sm border border-[#BFDBFE] p-6 overflow-hidden">

      <h2 className="text-md font-semibold text-[#1E3A8A] mb-4">
        Average Service Cost
      </h2>

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
            formatter={(value) => [`₹${value}`, "Average Cost"]}
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
            radius={[0,4,4,0]}
            barSize={20}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

