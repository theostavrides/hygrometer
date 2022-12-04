import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IMeasurement } from '../interfaces/IMeasurement';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

interface IGetChart {
    type: 'temperature'|'humidity';
    measurements: IMeasurement[];
}

const getChart = ({ type, measurements } : IGetChart) => {
    const labels = measurements.map((m) => {
        const d = new Date(m.timestamp)
        return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
    });
    
    const options = {
        responsive: true,
        plugins: {
            title: { display: true, text: `${type}` }
        }
    }

    const data = {
        labels,
        datasets: [
            {
                data: measurements.map(m => m[type]),
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
            {getChart({ type: 'temperature', measurements })}
            {getChart({ type: 'humidity', measurements })}
        </div>
    )
}

export default Charts