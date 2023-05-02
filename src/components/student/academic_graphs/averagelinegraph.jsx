import { Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement} from "chart.js/auto"
import { Line } from 'react-chartjs-2'

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const AverageLineGraph = ({academicData}) => {
    let graphData = []
    console.log(academicData)
    for(let i = 0; i < academicData.length; i++){
        graphData.push({examsetid: academicData[i].examsetid, average: academicData[i].average})
    }
    console.log('testing graph data', graphData)

    const labels = graphData.map(item => item.examsetid)
    const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Average Scores',
            data: graphData.map(item => item.average),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };
      
    return(
        <div style={{display:'grid', placeItems:'center'}}>
            <Line data={chartData} options={{ 
                scales: {
                    yAxes: [
                    {
                        ticks: {
                        beginAtZero: true
                        }
                    }
                    ]
                }
                }} 
            />
        </div>
    )
}

export default AverageLineGraph