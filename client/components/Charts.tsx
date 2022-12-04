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
);

export const tempOptions = {
    responsive: true,
    plugins: {
        title: { display: true, text: 'Temperature Chart' },
    },
};
  
export const humidityOptions = {
    responsive: true,
    plugins: {
        title: { display: true, text: 'Humidity Chart' },
    },
};
  

interface IProps {
    measurements: IMeasurement[];
}

const Charts: React.FC<IProps> = ({ measurements }) => {
    const labels = measurements.map((m, i) => {
        const d = new Date(m.timestamp)
        return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
    });
      
    const tempData = {
        labels,
        datasets: [
            {
                data: measurements.map(m => m.temperature),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const humidityData = {
        labels,
        datasets: [
            {
                data: measurements.map(m => m.humidity),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div>
            <Line options={tempOptions} data={tempData} />
            <Line options={humidityOptions} data={humidityData} />
        </div>
    )
}

export default Charts