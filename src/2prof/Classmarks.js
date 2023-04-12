import axios from 'axios';
import React, { useContext, useEffect, useState} from 'react'
import { currentclassContext } from '../Globalcontext';
import * as XLSX from 'xlsx';

function Classmarks() {
  const [data, setData] = useState()
  const {currentclass} = useContext(currentclassContext)


  useEffect(()=>{
    axios.get('https://api.kyusillid.online/api/getgradelist/' + currentclass.classes_id).then(
      response =>setData(response.data)
    ).catch()
  
    console.log(currentclass.classes_id)

    console.log(data)

  },[])

  useEffect(()=>{
    localStorage.setItem("gradelist", JSON.stringify(data))
  },[])

  const [searchfilter , setsearchfilter] = useState("");
  const [showTextbox, setShowTextbox] = useState(false);
 

  const handleView = (index) => {
    setShowTextbox(!showTextbox);
  };
  
  function exportGrades() {
    if (data) {
      const exportData = data.map(item => ({
        "Name": item.student.name,
        "Activity Grade": Math.round(item.activity.grade)+" / "+Math.round(item.activity.points),
        "Assignment Grade": Math.round(item.questionnaire.grade)+" / "+Math.round(item.questionnaire.points),
        "Quiz": 100+" / "+100,
        "Exam Grade" : 100+" / "+100,
        "Attendance Grade": 100+" / "+100,
        "Final Grade": Math.round((item.activity.grade * 0.2) + (item.questionnaire.grade * 0.2) + (100 * 0.2) + (100 * 0.35) + (100 * 0.05)).toFixed(2),
        "Computation criteria": "Activity 20%, Assignment 20%, Quiz 20%, Exam 35%, Attendance 5%",
      }));
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Grades");
      XLSX.writeFile(workbook, "grades.xlsx");
    }
  }

  return (
    <div>
      <div class="container">
      <button id='export' onClick={() => exportGrades()}>Export</button>

      <div class="search">
        <input
          type="text"
          placeholder="Search by name"
          name="search"
          onChange={e=>{setsearchfilter(e.target.value)}}
        />
      </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Activities</th>
            <th>Assignment</th>
            <th>Quizzes</th>
            <th>Exam</th>
            <th>Attendance</th>
          </tr>
        </thead>

        {data != undefined &&
          <tbody>
            {data.filter(
              item1=>
                searchfilter ==="" ||  item1.student.name.toLowerCase().includes(searchfilter)
            ).map((item, index) => (
              <tr key={index}>
                <td data-label="Name">{item.student.name} </td>
                <td>{Math.round(item.activity.grade)} / {Math.round(item.activity.points)}</td>
                <td>{Math.round(item.assignment.grade)} / {Math.round(item.assignment.points)}</td>
              </tr>
            ))}
          </tbody>
        }
      </table>
      <br />
      <style jsx>{`
        #export{
          background-color: #064273;
          border: 1px solid;
          font-size: 24px;
          cursor: pointer;
          border-radius: 8px;
          color: white;
          width: auto%;
          padding:5px;
        }
        .container {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          width: auto;
        }
      `}</style>
    </div>
  );
}

export default Classmarks;
