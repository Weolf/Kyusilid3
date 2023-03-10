import axios from 'axios'
import React, { useContext , useState, useEffect} from 'react'
import { userInfoContext } from '../../Globalcontext'
import logoiconimage from '../../assets/images/Kyusilid.jpg'
import logoiconimage1 from '../../assets/images/avatarlogo.webp'


function Login() {

  const {setuserinfo} = useContext(userInfoContext);
  const [username, setusername] = useState();
  const [password, setpassword] = useState();

  //Message for validation
  const [usernamemessage, setusermessage] = useState()
  const [passmessage, setpassmessage] = useState()

  

  const handleUsernameChange=(e)=>{
    setusername(e.target.value);
    setusermessage('');
  }
  
  const handlePasswordChange=(e)=>{
    setpassword(e.target.value);
    setpassmessage('');
  }



  // const handleFormSubmit=(e)=>{
  //   e.preventDefault();
  // }

 
  //API Code

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    //validation
    if(username=== undefined){
      alert('Username Required');
     }else{
       setusermessage('')
     }
 
     if(password === undefined){
       alert('Password Required');
     }else{
       setpassmessage('')
     }
 

   if(username!==undefined && password!==undefined){
    try {
      const response = await axios.post('https://api.kyusillid.online/api/login', {
          'acc_username': username,
          'acc_password': password
      });

      if (response.data.status === 'success') {
          console.log('Authentication Successful!');
          setuserinfo(response.data);
          console.log(response.data);
          // Store user data in local storage or use it as needed
      } else {
        alert("Username and password didn't match");
          console.log('Authentication Failed!');
      }
  } catch (error) {
      console.error(error.response.data);
  }

   }
};

// const handleFormSubmit = async (e) =>{
//   setuserinfo({'status': 'success', 'user': {'acc_email' : 
//   "student@gmail.com" , 'acc_id' : 3 , 'acc_username': "Jysreal"
  
//  },
//    'usertype': username, 'temp': '17-6928'})
// }


 
  return (
    <div className='Backgroundlog'>
      <div className='logotext col-lg-5'>
      <img src={logoiconimage} alt="" srcset="" className='avatar'/>
      <h1>QCU ONLINE CLASSROOM</h1>
      </div>
    <div className='Logincontainer primary'>
      
      <img src={logoiconimage1} alt="" srcset="" className='avatar'/>
      <h1>Login Here</h1>

      <form className='form-group-form' autoComplete="off"
      onSubmit={handleFormSubmit}>

  
        <label> Username:<div className='errortext'>{usernamemessage}</div></label>
            <input type="text" placeholder='Username...' defaultValue ={username} onChange={handleUsernameChange}/>
            

        <label> Password:<div className='errortext'>{passmessage}</div> </label>
            <input type="password" placeholder='password...' defaultValue ={password} onChange={handlePasswordChange}/>
            
           
       
        <button type="submit" className='buttonsubmit secondary'>login
        </button>
  {/* <center> <a href="EMS.forget.html">Forgot Password...</a></center>  */}
        </form>
         
    </div> 
    </div> 
  )
  
}



export default Login
