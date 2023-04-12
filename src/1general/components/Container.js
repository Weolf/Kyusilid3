import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Profilenotif from './Profilenotif'

import { Outlet , useNavigate, useLocation} from 'react-router-dom'
import { userInfoContext , myClasesContext  , currentclassContext , myArchivedContext} from '../../Globalcontext'
import axios from 'axios'



function Container() {
  const storedUserinfo = JSON.parse(localStorage.getItem("userinfo"));
  const [userinfo, setUserinfo] = useState(storedUserinfo);
  const [myclasses, setmyclasses] = useState();
  const [myarchive, setmyarchive] = useState();
  const [currentclass, setcurrentclass] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Save the current page URL to localStorage before refresh
    localStorage.setItem("lastPage", location.pathname);
    const lastpage = localStorage.getItem("lastPage");
    if (
      lastpage === "/classes/sampleclass" ||
      lastpage === "/classes/sampleclass/modules" ||
      lastpage === "/classes/sampleclass/sourcematerials" ||
      lastpage === "/classes/sampleclass/attendance" ||
      lastpage === "/classes/sampleclass/info" ||
      lastpage === "/classes/sampleclass/marks" ||
      lastpage === "/classes/sampleclass/messages" ||
      lastpage === "/classes/sampleclass/settings" ||
      lastpage === "/classes/sampleclass/students" 
    ) {
      localStorage.setItem("lastPage", "/home");
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem("userinfo", JSON.stringify(userinfo));
    if (!userinfo) {
      setUserinfo(JSON.parse(localStorage.getItem("userinfo")));
    }
  }, [userinfo]);

 
  useEffect(() => {
    filldata(); 
    console.log(userinfo.user.first_login)
  
    if(userinfo.user.first_login ===1){
    
      navigate('/Changepassword')
    }
  
    if(userinfo.usertype === 'admin'){
      navigate('/kyusilidAdmin');
    }
    
  },[userinfo]);


async function filldata(){
  await axios.get('https://api.kyusillid.online/api/getclasslist/' + userinfo.user.acc_id)
    .then(response => {
      setmyclasses(response.data);

    })
    .catch(error => {
      console.log(error);
    });

    await axios.get('https://api.kyusillid.online/api/getclasslist_archived/' + userinfo.user.acc_id)
    .then(response => {
      setmyarchive(response.data);
     
    })
    .catch(error => {
      console.log(error);
    });

}

 


  return (
 
    <myArchivedContext.Provider value={{myarchive, setmyarchive}}>
      <myClasesContext.Provider value={{myclasses, setmyclasses}}>
    <currentclassContext.Provider value={{currentclass, setcurrentclass}}>
    <div className='maincontainer'>
        <Sidebar/>
        <div className='content'>
         
            <Profilenotif />
            <Outlet/> 
        </div> 
        </div>
    </currentclassContext.Provider>     
    </myClasesContext.Provider> 
    </myArchivedContext.Provider>
  
  )
}

export default Container