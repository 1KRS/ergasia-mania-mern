/* eslint-disable react-hooks/exhaustive-deps */
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { translateText } from '../utils/translateText';
import { useAppContext } from '../context/appContext';

const AreaChartComponent = ({ data }) => {
  const { language } = useAppContext();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey={translateText('Αιτήσεις', language)} stroke="#2cb1bc" fill="#bef8fd" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;
