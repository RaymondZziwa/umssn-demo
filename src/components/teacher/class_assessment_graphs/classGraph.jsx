import { Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement} from "chart.js/auto"
import { Line } from 'react-chartjs-2'

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const ClassGraph = ({data}) => {
    //const labels = data.map(item => item.examsetid)
    const datasets = Object.keys(data).map((stream, index) => ({
        label: stream,
        data: Object.values(data[stream]),
        fill: false,
        borderColor: `rgba(${index * 50}, ${255 - index * 50}, 0, 1)`,
        lineTension: 0.2
      }));
    
      const chartData = {
        labels: Object.keys(data[Object.keys(data)[0]]),
        datasets: datasets
      };
    
      return <Line data={chartData} />;
}

export default ClassGraph