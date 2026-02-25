import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';

type PieData = {
  name: string;
  value: number;
};

type Props = {
  data: PieData[];
};

const COLORS = [
  '#2563EB',
  '#16A34A',
  '#F59E0B',
  '#DC2626',
  '#7C3AED',
  '#0891B2'
];

export const PortfolioPieChart: React.FC<Props> = ({ data }) => {
  return (
    <div style={{ width: '100%', marginTop: '20px' }}>
      {/* 1. Heading moved to the TOP with a margin below it */}
      <h2 style={{ 
        color: '#1E40AF', 
        textAlign: 'center', 
        marginBottom: '24px' // This adds the spacing you want
      }}>
        Portfolio Distribution
      </h2>

      {/* 2. Container stays below the heading */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={(entry) => `${entry.value.toFixed(1)}%`}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              typeof value === 'number'
                ? `${value.toFixed(2)}%`
                : value
            }
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
