import { Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement} from "chart.js/auto"
import { Line } from 'react-chartjs-2'
import { useState, useEffect } from "react"
import axios from "axios"
ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const SubjectGraph = ({assessmentData}) => {

    let graphData = []
    console.log('assess' , assessmentData)
    const [subject, setSubject] = useState('')
    for(let i = 0; i < assessmentData.length; i++){
        let examsetid = assessmentData[i].examsetid
        let result = parseInt(assessmentData[i][subject])

        graphData.push({examsetid: examsetid, result: result})
    }
    console.log('testing graph data', graphData)

    const [isSubjectListLoading, setIsSubjectListLoading] = useState(true)
    const [subjectList, setSubjectList] = useState(undefined)

    const fetchSubjects = async() => {
        let res = await axios.post('http://82.180.136.230:5000/fetchsubjects', {
            token: localStorage.getItem('token')
        })
         if(res.data.responseStatus !== 404 || res.data.responseStatus !== 403 ){
            setIsSubjectListLoading(false)
            setSubjectList(res.data)
        }
    }

    useEffect(()=>{
        fetchSubjects()
    },[])

    const subjectHandler = event => {
        event.preventDefault()
        setSubject(event.target.value)
    }

    const labels = graphData.map(item => item.examsetid)
    const chartData = {
        labels: labels,
        datasets: [
          {
            label: `Student ${subject} Results Per In The Past Examination Sets`,
            data: graphData.map(item => item.result),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };
    return(
        <div style={{display:'grid', placeItems:'center'}}>
            <h3>Independent Subject Performance Analyzer</h3>
                    <div className="mb-3">
                        <select className="form-select" aria-label="Default select example" onChange={subjectHandler}  required>
                                <option defaultValue>Select Subject To Analyze</option> 
                                {isSubjectListLoading ? 
                                    <option defaultValue>Select Subject Responsible For</option> : 
                                    subjectList.map((sub => (
                                        <option key={sub.subjectid} value={sub.subjectname}>{sub.subjectname}</option>
                                    )))
                                }
                        </select>
                    </div>
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

export default SubjectGraph