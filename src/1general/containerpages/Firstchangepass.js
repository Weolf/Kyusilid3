import React  from 'react'
import axios from 'axios';
import { userInfoContext } from '../../Globalcontext';
import { useContext , useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Firstchangepass() {
  const [ newpass , setnewpass] = useState();
  const [confirmnewpass, setconfirmnewpass]= useState();
  const {userinfo , setuserinfo } = useContext(userInfoContext);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0);




  useEffect(()=>{
  
 
    if( (userinfo !== undefined && userinfo.user.first_login ===0)  || userinfo.undefined){
      navigate('/')
    }
  },[])




  const handlechangepass = (e) => {
    e.preventDefault();
  
    if (newpass === confirmnewpass && newpass !== undefined && confirmnewpass !== undefined) {
  
      const temp = {
        "acc_id": userinfo.user.acc_id,
        "acc_password": newpass
      }
  
      axios.post('https://api.kyusillid.online/api/reset-pass', temp)
        .then(() => {
          console.log("password successfully changed");
          setnewpass("");
          setconfirmnewpass("");
          const confirmLogout = window.confirm("Your password has been change successfully, You will now be redirected to the login page. Click OK to continue.");
          if (confirmLogout) {
          
            localStorage.removeItem('userinfo');
            localStorage.removeItem('authenticated');     
            navigate('/');        
          }
        })
        .catch()
        setuserinfo(); 
    }
  
    if ((newpass !== undefined && newpass.length < 6) || (newpass !== undefined && newpass.length < 6)) {
      alert("password minimum length is 6")
      return
    }
  
    if (newpass !== confirmnewpass) {
      alert("passwords must match")
      return
    }
  }
  
  

  return (
    <div>
      {userinfo !== null ?
        <div className='Backgroundlog absolute'>
     
        <div className='resetpass1 primary borderradius-md'>
       <form action="" onSubmit={handlechangepass} >
       <center><h1>UPDATE PASSWORD</h1></center>
       <br></br>
         <input type='password'  className='editt' placeholder='New Password' onChange={(e)=>{setnewpass(e.target.value)}}/>
         <br></br>       
         <input type='password'className='editt1' placeholder='Confirm Password' onChange={(e)=>{setconfirmnewpass(e.target.value)}}/>
         <br></br>
         <button className="secondary commonbutton lighttext col-lg-4"> Save</button>
       </form>
       </div>
 
     </div>
     :
     <div></div>
      }
    </div>
  
   
  )
}

export default Firstchangepass