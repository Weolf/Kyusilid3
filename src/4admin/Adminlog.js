import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";


function Adminlog() {
  const [data, setData] = useState([

  ]);
  const [filteredData, setFilteredData] = useState(data);
  const location = useLocation();

  useEffect(() => {
    // Save the current page URL to localStorage before refresh
    localStorage.setItem("lastPage", location.pathname);
  }, [location]);


  useEffect(()=>{
      axios.get('https://api.kyusillid.online/api/getadminlog').then(
        response=> setFilteredData(response.data)
      ).catch();

      console.log(JSON.stringify(data))
  },[])


  const handleSearch = event => {
    const searchTerm = event.target.value.toLowerCase();
    setFilteredData(
      data.filter(d => d.firstname.toLowerCase().includes(searchTerm))
    );
  };

  const [showTextbox, setShowTextbox] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleView = (index) => {
    setShowTextbox(!showTextbox);
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleEdit = (index) => {
    setSelectedRow(index);
    setShowTextbox(true);
  };
  return (
    <div>

      <div>
        <h3>Admin Log</h3>
      </div>
      


      {showTextbox && (
  <div className='Editext'>
    <input className='Inputext' type="text" value={data[selectedRow].name} onChange={(event) => {
      const newData = [...data]; 
      newData[selectedRow].name = event.target.value;
      setData(newData); 
    }} />
    <button 
    className='Savee'
    onClick={() => {
      setShowTextbox(false);
      setSelectedRow(null);
    }}>Save</button>
    <button 
    className='Cancel'
    onClick={() => {
      setShowTextbox(false);
      setSelectedRow(null);
    }}>Cancel</button>
  </div>
)}
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date and Time</th>
            <th>Action</th>
  

          </tr>
        </thead>
        <tbody>
        {filteredData !== undefined &&  filteredData.map((item, index) => (
  <tr key={index}>
    <td data-label="Name">{item.firstname} {item.middle} {item.lastname}</td>
    <td data-label="date">{item.created_at}</td>
    <td data-label="In">{item.action}</td>
  
  </tr>
))}

        </tbody>
      </table>

  
    </div>
  );
}
 
 


  


export default Adminlog