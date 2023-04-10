/* eslint-disable react-hooks/exhaustive-deps */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { translateText } from '../utils/translateText';
import { useAppContext } from '../context/appContext';

const BarChartComponent = ({ data }) => {
  const { language } = useAppContext();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey={translateText('Αιτήσεις', language)} fill="#2cb1bc" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
