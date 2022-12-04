import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IMeasurement } from '../interfaces/IMeasurement';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

interface IGetChart {
    title: string;
    values: number[];
}

const getChart = ({ title, values } : IGetChart) => {
    const labels = values.map((val, i) => {
        const d = new Date(val)
        return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
    });
    
    const options = {
        responsive: true,
        plugins: {
            title: { display: true, text: title }
        }
    }

    const data = {
        labels,
        datasets: [
            {
                data: values,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
        ]
    }

    return <Line options={options} data={data} />
}

interface IProps { measurements: IMeasurement[]; }

const Charts: React.FC<IProps> = ({ measurements }) => {
    return (
        <div>
            {getChart({ title: 'Temperature Chart', values: measurements.map(m => m.temperature) })}
            {getChart({ title: 'Humidity Chart', values: measurements.map(m => m.humidity) })}
        </div>
    )
}

export default Charts