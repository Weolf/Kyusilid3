import React, { useState , useContext} from 'react'
import Multiselector from '../1general/formcomponents/Multiselector';
import Dropdown from '../1general/formcomponents/Dropdown';
import axios from 'axios';
import { announcementlistContext , myClasesContext , currentclassContext, userInfoContext} from '../Globalcontext';

function CreateAnnouncementprof() {
    const[announcementcontent, setannouncementcontent] = useState();
    const[announcementtitle, setannouncementtitle] = useState();
    const {setannouncementlist} = useContext(announcementlistContext);
    const {currentclass} = useContext(currentclassContext);
    const {userinfo} = useContext(userInfoContext);
    const {myclasses} = useContext(myClasesContext);
    const [saveannouncementready, setsaveannouncement] = useState(true);
    const posttypes = ['fixed' , 'timed']
    const [posttype, setposttype] = useState('fixed')
    const [selectedclass, setselectedclass] =useState([]) 

    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const [postdate, setpostdate] = useState(new Date(Date.now() -tzoffset).toISOString().slice(0, -8));
   
    const [currentdate  , setcurrentdate] = useState(new Date(Date.now() -tzoffset).toISOString().slice(0, -8));

   
   
    var days = {'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6};
  
    

   function getdaysfromnow(day){
     const currentday = new Date().getDay();
     const targetday = days[day]
   
     if(targetday> currentday){
        return targetday - currentday;

     }else{
        return  targetday - currentday + 7;
     }
      
   }

   function gethours(time){
    time = time.replace(':' , " ");
    const temp = time.split(" ")
        if(temp.length===3){
           return temp[0]
        }
        return 0;
   }

   function getminutes(time){
    time = time.replace(':' , " ");
    const temp = time.split(" ")
        if(temp.length===3){
           return temp[1]
        }
        return 0;
   }




    function setfuturedate(day , time){
        const currdate= new Date()
        const targetdate= new Date();
      
        targetdate.setDate(currdate.getDate() + getdaysfromnow(day))
        targetdate.setHours(gethours(time))
        targetdate.setMinutes(getminutes(time))


        return targetdate;
    }


    function saveAnnouncement(e){
        e.preventDefault();
    
    
        if(saveannouncementready===true){
            setsaveannouncement(false);
              for(let x =0 ; x < selectedclass.length; x++){
                if(selectedclass[x].selected){
                    let ggt = {
                        'title' : announcementtitle,
                        'content' : announcementcontent,
                        'add_id' : userinfo.user.acc_id,
                        'classes_id' : selectedclass[x].value.classes_id,
                        'created_at' : posttype==='fixed' ? new Date(postdate) : setfuturedate(selectedclass[x].value.day_label, selectedclass[x].value.sched_from)
                    }

                    
                    console.log(ggt) // dito na maglalagay ng axios

                }
    
             
              }
     
                e.target.reset();
                setannouncementcontent();
                setannouncementtitle();
                axios.get('http://localhost:8000/api/get-announcement/' + currentclass.classes_id)
                .then(response => {
                setannouncementlist(response.data)
          })
          .catch(error => {
            console.log(error);
          });
          setsaveannouncement(true);
        }
    }

    const [activ, setactiv] = useState(false)

    const temp2 = ()=>{
        setactiv(!activ)
    }

  

 


  return (
    <div className='col-lg-12  margintop12 '>

       <div className='tertiary postannouncementcontainer borderradius-lg'>
       {!activ ?
            <div className='relative postannouncementbody'>
                <div className='postannouncementclosed' onClick={temp2}>
                    Post an announcement
                </div>           
            </div>  
            :
            <div className='postannouncement'>

                <div className="row">
                    <div className="col-lg-3">
                        <p className='smallfont'> Select Classes</p>
                    <Multiselector
                        options={myclasses}
                        onChangeHandler = {setselectedclass}
                        mainClass= 'dropdownmain primary borderradius-md'
                        itemClass= 'dropdownitem'
                        controlClass='dropdowncontrol'
                        menuClass='dropdownmenu primary'
                        controlActiveClass='dropdowncontrolactive'
                        mainActiveClass='dropdownmain-active'
                        placeholderValue='Select classes'
                        selectedAndDisabled = {currentclass}
                    />
             
                    </div>
                    <div className="col-lg-3">
                        <div>
                            <p className='smallfont'>Schedule post</p>
                  
                            <Dropdown
                                options={posttypes}
                                onChangeHandler= {setposttype}
                                mainClass= 'dropdownmain primary borderradius-md'
                                itemClass= 'dropdownitem'
                                controlClass='dropdowncontrol'
                                menuClass='dropdownmenu primary'
                                controlActiveClass='dropdowncontrolactive'
                                mainActiveClass='dropdownmain-active'
                            />                        
                        </div>
                    </div>

                    <div className='col-lg-4'>
                        <div>
                            <p className='smallfont'>Schedule post</p>
                            {posttype==="fixed" ?
                            <input type="datetime-local" className='dropdowncontrol primary borderradius-md' defaultValue={postdate}  min={currentdate} onChange={(e)=>{setpostdate(e.target.value)}}/>
                            :
                            <div>At the start of the class</div>
                            }
                            
                        </div>
            </div>
                </div>
                <form action="" onSubmit={(e)=>{saveAnnouncement(e)}}>
                <div className='margintop12'>
                <input type='text' className='commontextarea primaryborder' placeholder='Enter title...' onChange={(e)=>{setannouncementtitle(e.target.value)}} />
                <textarea name="" id="" cols="30" rows="3" className='commontextarea primaryborder' placeholder='Enter content...' onChange={(e)=>{setannouncementcontent(e.target.value)}}></textarea>
  
            </div>
                    <div className="postannouncementfooter flex">
                             <button onClick={temp2} className='secondary lighttext commonbutton'> Cancel</button>
                            <input type="submit" className='secondary  lighttext commonbutton' value="Post" />
                    </div>  
                </form>
                
            </div>  
    }
       </div>       
    </div>
  )
}

export default CreateAnnouncementprof