import {Row, Col} from "react-bootstrap"
import { useEffect, useState } from "react";
import TeacherNavbar from "../navbars/teacher_navbar";
import axios from "axios";
import ClassAssesment from "./class_assessment/class_assessment";
import ClassGraph from "./class_assessment_graphs/classGraph";
import loading from '../../imgs/Loading.gif'
const TeacherDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [results, setResults] = useState([])
    const [areResultsLoading, setAreResultsLoading] = useState(true)
    const [graphData, setGraphData] = useState(null)
    const [isGraphDataLoading, setIsGraphDataLoading] = useState(true)


    const [areStudentProfilesLoading, setAreStudentProfilesLoading] = useState(true)
    const [studentProfiles, setStudentProfiles] = useState(null)

    const fetchStudentProfiles = async() => {
      let res = await axios.post('http://82.180.136.230:5000/fetchstudentprofiles', {
          token: localStorage.getItem('token')
      })

      if(res.data.responseStatus !== 404 || res.data.responseStatus !== 403){
          setAreStudentProfilesLoading(false)
          setStudentProfiles(res.data)
      }else if(res.data.responseStatus === 404){
          setAreStudentProfilesLoading(true)
      }

      console.log(res.data)
  }

  useEffect(() => {
    fetchStudentProfiles()
  }, [])



    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchStudentsResults = async () => {
        let res = await axios.post('http://82.180.136.230:5000/fetchall',{
            token: localStorage.getItem('token')
        })

        if(res.data.responseStatus !== 404 || res.data.responseStatus !== 403 ){
            setAreResultsLoading(false)
            setResults(res.data)
        }
    }

    useEffect(() => {
      fetchStudentsResults()
    }, [])


    useEffect(() => {
       
    }, [results])

    useEffect(() => {
      const getData = setTimeout(() => {
        const streams = {};

        // Sort the data by studentstream
        results.sort((a, b) => a.studentstream.localeCompare(b.studentstream));
        
        // Group the data by studentstream
        for (const item of results) {
          if (!streams[item.studentstream]) {
            streams[item.studentstream] = [];
          }
          streams[item.studentstream].push(item);
        }
        
        // Calculate the average performance for each stream and examsetid
        const averages = [];
        for (const stream in streams) {
          for (const item of streams[stream]) {
            if (!averages[stream]) {
              averages[stream] = {};
            }
            if (!averages[stream][item.examsetid]) {
              averages[stream][item.examsetid] = [];
            }
            averages[stream][item.examsetid].push(parseInt(item.average));
          }
          for (const examsetid in averages[stream]) {
            const average = averages[stream][examsetid].reduce((sum, val) => sum + val) / averages[stream][examsetid].length;
            averages[stream][examsetid] = average;
          }
        }
        setGraphData(averages)
        setIsGraphDataLoading(false)
        console.log('results', results)
        console.log(averages);
        console.log('gd',graphData)
      }, 3000);
      return () => clearTimeout(getData);
    }, [results]);
    

    return(
        <Row>
        <Col sm='12' md='12' lg='12' xl='12'>
            <TeacherNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
        </Col>

        <Row>
            <Col sm='12' md='4' lg='4' xl='4'>
                <h3>Class Profile</h3>
                <div style={{display:'grid', placeItems:'center'}}>
                      {studentProfiles ? 
                         <>
                            Class : {studentProfiles[0].studentclass}<br></br>
                            Total number of students in Class :{studentProfiles.length} <br></br>
                         </>
                       : 
                        <p style={{textAlign:'center'}}><img src={loading} alt='loading' style={{height:'80px'}}/><br></br>Loading...</p>
                      }
                    
                    {/* {graphData ? 
                          <ClassAssesment  assessmentData={graphData}/>
                       : 
                        <p style={{textAlign:'center'}}><img src={loading} alt='loading' style={{height:'80px'}}/><br></br>Loading class data...</p>
                      }  */}
                </div>

            </Col> 
            <Col sm='12' md='8' lg='8' xl='8'>
                <h3>Class General Academic Overview</h3>
                       {graphData ? 
                         <ClassGraph data={graphData} />
                       : 
                        <p style={{textAlign:'center'}}><img src={loading} alt='loading' style={{height:'80px'}}/><br></br>Loading graph data...</p>
                      }            
            </Col>
        </Row>
    </Row>
    )
}

export default TeacherDashboard