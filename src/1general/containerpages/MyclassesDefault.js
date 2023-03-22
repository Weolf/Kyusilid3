import React, { useContext, useState, useEffect } from 'react'
import Classpanel from '../components/Classpanel'
import { myClasesContext } from '../../Globalcontext'



function MyclassesDefault() {
  const {myclasses} = useContext(myClasesContext);
  const [currday, setcurrday] = useState(
    new Date().getDay()
  )


      
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [upcomingclasses , setupcomingclasses] = useState([])

  const [allclasses, setallclasses] = useState([])

  useEffect(()=>{
    if(myclasses !== undefined){
      setupcomingclasses(myclasses.filter(item => item.day_label === days[currday]))
      setallclasses(myclasses.filter(item => item.day_label !== days[currday]))
    }

  },[myclasses])

  

  



  return (
    <div>
 
    {upcomingclasses.length > 0 && 
    <div>
    <h4 className='title'>Classes today</h4>


    <div className='classcontainer'>
   <div className="row">
   {upcomingclasses!==undefined &&
       upcomingclasses.map((item, key)=>(
        <Classpanel key={key}  classitem ={item}/>
      ))}
    </div>
   </div>
    </div>
    }

   

    <h4 className='title'>All Classes</h4>

   <div className='classcontainer'>
   <div className="row">
   {allclasses!== undefined &&
       allclasses.map((item, key)=>(
        <Classpanel key={key}  classitem ={item}/>
      ))}
       
    </div>
   </div>

    

     
  
    
  
    </div>
  )
}

export default MyclassesDefault