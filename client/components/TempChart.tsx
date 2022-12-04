import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IMeasurement } from '../interfaces/IMeasurement';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: { position: 'top' as const },
        title: { display: true, text: 'Temperature Chart' },
    },
};
  

interface IProps {
    measurements: IMeasurement[];
}

const TempChart: React.FC<IProps> = ({ measurements }) => {
    const labels = measurements.map((m, i) => {
        const d = new Date(m.timestamp)
        return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
    });
      
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 2',
                data: measurements.map(m => m.temperature),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    
    return <Line options={options} data={data} />
}

export default TempChart