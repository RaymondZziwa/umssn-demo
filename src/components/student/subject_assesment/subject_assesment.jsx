const SubjectAssesment = ({assessmentData}) => {
    console.log("assess", assessmentData)
    let bestPerformedSubjects =  Object.entries(assessmentData).filter(([key, value]) => {
        // Convert the value to a number and check if it's greater than 95
        return key !== "total" && key !== "average" && Number(value) > 95;
      }).map(([key, value]) => ({ subject: key, grade: Number(value) }));
      

    let worstPerformedSubjects =  Object.entries(assessmentData).filter(([key, value]) => {
        // Convert the value to a number and check if it's greater than 95
        return key !== "total" && key !== "average" && key !== "pos_s" && key !== "pos_c" && key !== "ple" && Number(value) < 70;
      }).map(([key, value]) => ({ subject: key, grade: Number(value) }));

    console.log('bps', bestPerformedSubjects)
    console.log('wps', worstPerformedSubjects)
    return(
        <div style={{display:'grid', placeItems:'center'}}>
                    <h4 style={{textAlign:'center'}}>Best Performed Subjects</h4>
                    <table className="table" style={{textAlign:'center'}}>
                        <thead>
                            <tr>
                                <th scope="col">Subject</th>
                                <th scope="col">Score</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                bestPerformedSubjects.map((subject => (
                                   <tr key={subject.subject}>
                                        <td>{subject.subject}</td>
                                        <td>{subject.grade}</td>
                                   </tr>
                                )))
                            }
                        </tbody>
                    </table>
                    <h4 style={{textAlign:'center'}}>Worst Performed Subjects</h4>
                    <table className="table" style={{textAlign:'center'}}>
                        <thead>
                            <tr>
                                <th scope="col">Subject</th>
                                <th scope="col">Score</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {worstPerformedSubjects.length ?
                                worstPerformedSubjects.map((subject => (
                                   <tr key={subject.subject}>
                                        <td>{subject.subject}</td>
                                        <td>{subject.grade}</td>
                                   </tr>
                                ))):
                                <p>No data found.</p>
                            }
                        </tbody>
                    </table>
        </div>
        
    )
}

export default SubjectAssesment