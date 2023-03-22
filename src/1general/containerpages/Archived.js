import React, { useContext , useEffect, useState } from 'react'
import Classpanel from '../components/Classpanel'
import { myArchivedContext , myClasesContext} from '../../Globalcontext'


import Archiveselection from '../../2prof/Archiveselection';


function Archived() {
  const {myarchive} = useContext(myArchivedContext);
  const {myclasses} = useContext(myClasesContext);

  const [selectclasses, setselectclasses] = useState(false);
  const [classselection, setclassselection] = useState()
  const [merged, setmerged] = useState(myclasses);



  useEffect(()=>{
      if(myarchive!== undefined && myclasses !== undefined){
        setmerged([...myclasses , ...myarchive]);

      }
     
  },[myclasses , myarchive])



  useEffect(()=>{
      if(merged !== undefined){
        setclassselection(merged.map(item=>({
          "selected" : item.isarchived , "itemselect" : item
        })))
      }
  },[merged])

  const handleselected= (selected,ee)=>{
    setclassselection(classselection.map(item=>({
      'selected' :(item.itemselect.sec_name + item.itemselect.sub_name === ee.itemselect.sec_name+ ee.itemselect.sub_name) ? selected : item.selected,
      'itemselect': item.itemselect
    })))
    
  }




  return (
    <div className='flex '>

      <div className={`archiveselection borderradius-lg tertiary  ${selectclasses && 'archiveselectionactive'}`}>

        <ul>

          {classselection !== undefined   &&  classselection.map((item, key)=>(
                   <Archiveselection key={key} item= {item} handleselected={handleselected}/>
          ))}
         
      



  
    
        </ul>

        <button className='commonbutton lighttext secondary ' onClick={()=>{console.log(JSON.stringify(classselection))}}> Update Archived</button>


      </div>




    <div className='width100'>
      <div className='classcontainer '>
      
      <div className='flex '>
      <h4> Archived classes</h4>
     <div className='marginleftauto'>

     {!selectclasses ?   <button className='commonbutton secondary lighttext' onClick={()=>setselectclasses(true)}> <h4>select classes </h4></button>
      :<button className='commonbutton secondary lighttext' onClick={()=>{setselectclasses(false)}}> <h4> Cancel </h4></button>}
    
     </div>
    
    </div>

   

        <div className="row">

          {myarchive !== undefined && myarchive.map((element, key)=>(
              <Classpanel  key ={key} classitem = {element}/> 

          ))}
           
      
            
        </div>
      </div></div>

    </div>
  )
}

export default Archived