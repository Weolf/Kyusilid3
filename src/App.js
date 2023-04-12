import './Libot.css';
import './Aira.css';
import './App.css';
import './chart.css'
import './profilestud.css'
import './assets/css/bootstrap-grid.css';
import { useState } from 'react';
import { themeContext , userInfoContext} from './Globalcontext';
import Container from './1general/components/Container';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa'


import Login from './1general/containerpages/Login';
import MyClasses from './1general/containerpages/MyClasses';
import Dashboard from './1general/containerpages/Dashboard';
import Archived from './1general/containerpages/Archived';
import ClassContainer from './1general/containerpages/ClassContainer';
import MyclassesDefault from './1general/containerpages/MyclassesDefault';
import ClassStats from './1general/containerpages/ClassStats';
import ClassInfo from './1general/containerpages/ClassInfo';
import Quiz from './1general/containerpages/Quiz';
import ClassActivity from './1general/containerpages/ClassActivity';
import Classmarks from './2prof/Classmarks';
import ClassModules from './2prof/ClassModules';
import Createnew from './2prof/Createnew';
import Attendance from './1general/containerpages/Attendance';
import ClassMarkPage from './1general/containerpages/ClassMarkPage';



import AdminContainer from './4admin/AdminContainer';
import AdminDashboard from './4admin/AdminDashboard';
import Accountsprof from './4admin/Accountsprof';
import Department from './4admin/Department';
import FileManager from './4admin/FileManager';
import Log from './4admin/Adminlog';
import AdminAddModule from './4admin/AdminAddModule';
import Profiilepage from './1general/containerpages/Profiilepage';
import MessagesPage from './1general/containerpages/MessagesPage';
import SourceMaterials from './2prof/SourceMaterials';
import Classloading from './1general/loadingscreen/Classloading';
import Departmentoverview from './4admin/Departmentoverview';
import Adminlog from './4admin/Adminlog';
import Events from './4admin/Events';
import Subjects from './4admin/Subjects';
import Classespage from './4admin/Classespage';
import Accountsstud from './4admin/Accountsstud';
import SectionContainer from './4admin/SectionContainer';
import SampleSection from './4admin/SampleSection';
import Adminannouncements from './4admin/Adminannouncements'
import CreateClass from './4admin/CreateClass';
import Createproff from './4admin/Createproff';
import Createstud from './4admin/Createstud';
import ClassSettings from './1general/containerpages/ClassSettings';
import AdminCreateActivity from './4admin/AdminCreateActivity';
import Firstchangepass from './1general/containerpages/Firstchangepass';
import Viewresponse from './2prof/Viewresponse';
import Updatelist from './4admin/Updatelist';
import Updatelistproff from './4admin/Updatelistproff';
import Updatedliststud from './4admin/Updatedliststud';




function App() {

  const [theme, settheme] = useState('default');
  const [userinfo, setuserinfo ] = useState();
 
  return (

    <userInfoContext.Provider value={{userinfo, setuserinfo}}>
    <themeContext.Provider value={{theme, settheme}}>


      <div className={theme}>
      <div className='appbody background'>
        <BrowserRouter>
            <Routes>
            <Route path='/Quiz' element={<Quiz/>} />
            <Route path = '/Changepassword' element={userinfo !== null ? <Firstchangepass/> :<Login/>}/>
            <Route path='/ClassMarkPage' element={<ClassMarkPage/>} />
              <Route path={'/'} element={userinfo!=null ? <Container/> : <Login/> } > 
                <Route path={'home'} element={<Dashboard/>}></Route>  {/*this is the dashboard*/}
                <Route path={'classes/sampleclass'} element={<ClassContainer/>}>          
                        <Route path='' element ={ <ClassStats/>} />
                        <Route path='createnew' element={<Createnew/> }/>
                        <Route path='info'  element={<ClassInfo/>} />
                        <Route path='marks' element={<Classmarks/>} />
                        <Route path='modules' element={<ClassModules/>} />
                        <Route path='sourcematerials' element={<SourceMaterials/>} />
                        <Route  path='attendance' element={<Attendance/> }/>
                        <Route path= 'activity/activityId' element={<ClassActivity/>} />
                        <Route path='activity/activityId/response' element ={<Viewresponse/>}/>
                      
                        <Route path='messages' element={<MessagesPage/>} />  
                        <Route path= 'settings' element={<ClassSettings/>} />        
                  </Route>
                     
                <Route path={'archived'} element={<Archived/>} /> 
                <Route path={'profile'} element={<Profiilepage/> } />
                    
              </Route> 
              <Route path='/kyusilidAdmin' element={userinfo!=null ? <AdminContainer/> : <Login/>}>
                <Route path='' element={<AdminDashboard/>} />
                <Route path='department' element={<Department/>}> 
                  <Route path='' element={<Departmentoverview/>} />
                  <Route path='admin_announcements' element={<Adminannouncements/>} />
                  <Route path='subjects' element={<Subjects/>} />
                  <Route path='adminsidemodules' element={<AdminAddModule/>}/>
                  <Route path='createactivity' element={<AdminCreateActivity/>}/>
                  <Route path='accounts' element={<Accountsprof/>} />
                  <Route path='sections' element={<SectionContainer/>}>
                        <Route path='' element={<Classespage/>}> </Route>
                        <Route path='samplesection' element={<SampleSection/>} > </Route>
                  </Route>
                  <Route path='accounts_prof' element={<Accountsprof/>}></Route>
                  <Route path='accounts_stud' element ={<Accountsstud/>}></Route>
              
                  <Route  path='createclass' element={<CreateClass/>}/>
                  <Route  path='createproff' element={<Createproff/>}/>
                  <Route  path='createstud' element={<Createstud/>}/>
                  <Route path = 'updatelist' element={<Updatelist/>} />
                  <Route path='updatelistproff' element={<Updatelistproff/>}></Route>
                  <Route path='updateliststud' element={<Updatedliststud/>}></Route>
              
                </Route>
                <Route path='adminlog' element={<Adminlog/>}/>
             
                
                
             
              </Route>
            </Routes>   
            
              <div className='createNewbutton secondary'>
                <FaPlus/>
              </div>
          
        </BrowserRouter>
      </div>
      </div>

    </themeContext.Provider>
    </userInfoContext.Provider>
  

  );
}

export default App;
