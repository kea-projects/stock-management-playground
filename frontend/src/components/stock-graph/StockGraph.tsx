import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

// interface StockGraphProps {
//     labels: string[]
//     data: number[]
//     labelName: string[]
// }

export function StockGraph() {
    return (
        <Line
            data={{
                labels: ['Jun', 'Jul', 'Aug'],
                datasets: [
                    {
                        borderColor: 'rgb(255, 99, 132)',
                        label: 'hello',
                        data: [5, 6, 7],
                    },
                ],
            }}
        />
    )
}
