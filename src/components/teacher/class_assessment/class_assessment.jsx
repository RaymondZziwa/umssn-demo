import { useEffect } from "react";

const ClassAssesment = ({assessmentData}) => {
    console.log("assess", assessmentData)
    let bestPerformedSubjects =  Object.entries(assessmentData).filter(([key, value]) => {
        // Convert the value to a number and check if it's greater than 95
        return key !== "total" && key !== "average" && Number(value) > 95;
      }).map(([key, value]) => ({ subject: key, grade: Number(value) }));
      

    let worstPerformedSubjects =  Object.entries(assessmentData).filter(([key, value]) => {
        // Convert the value to a number and check if it's greater than 95
        return key !== "total" && key !== "average" && key !== "pos_s" && key !== "pos_c" && key !== "ple" && Number(value) < 70;
      }).map(([key, value]) => ({ subject: key, grade: Number(value) }));


    useEffect(()=>{
        console.log('bps', bestPerformedSubjects)
        console.log('wps', worstPerformedSubjects)
    },[assessmentData])
    return(
        <div style={{display:'grid', placeItems:'center'}}>
                    <h4 style={{textAlign:'center'}}>Best Performing Students</h4>
                    <table className="table" style={{textAlign:'center'}}>
                        <thead>
                            <tr>
                                <th scope="col">Student Name</th>
                                <th scope="col">Average</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {!bestPerformers.length ?
                                bestPerformers.map((student => (
                                   <tr key={student.studentName}>
                                        <td>{student.studentName}</td>
                                        <td>{student.averageScore}</td>
                                   </tr>
                                ))):
                                <tr><td><p>All students scored below 95% average.</p></td></tr>
                            }
                        </tbody>
                    </table>
                    <h4 style={{textAlign:'center'}}>Poor Performing Students</h4>
                    <table className="table" style={{textAlign:'center'}}>
                        <thead>
                            <tr>
                                <th scope="col">Student Name</th>
                                <th scope="col">Average</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {poorPerformers.length ?
                                poorPerformers.map((student => (
                                   <tr key={student.studentname}>
                                        <td>{student.studentName}</td>
                                        <td>{student.averageScore}</td>
                                   </tr>
                                ))):
                                <tr><td><p>All Students scored above 80% average.</p></td></tr>
                            }
                        </tbody>
                    </table>
        </div>
        
    )
}

export default ClassAssesment