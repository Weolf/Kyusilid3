import axios from 'axios'
import React, { useContext , useState, useEffect} from 'react'
import { userInfoContext } from '../../Globalcontext'
import logoiconimage from '../../assets/images/Kyusilid.png'
import logoiconimage1 from '../../assets/images/avatarlogo.webp'
import { useNavigate } from "react-router-dom";


function Login() {

  const {setuserinfo} = useContext(userInfoContext);
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

  //Message for validation
  const [usernamemessage, setusermessage] = useState()
  const [passmessage, setpassmessage] = useState()

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    if (authenticated === "true" && userinfo) {
      setuserinfo(userinfo);
      const lastPage = localStorage.getItem("lastPage");

    if (lastPage) {
      localStorage.removeItem("lastPage"); 
      navigate(lastPage);
    }}
  }, [navigate, setuserinfo]);


  const handleUsernameChange=(e)=>{
    setusername(e.target.value);
    setusermessage('');
  }
  
  const handlePasswordChange=(e)=>{
    setpassword(e.target.value);
    setpassmessage('');
  }



 

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
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("userinfo", JSON.stringify(response.data));
          navigate("/home");
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



if(!localStorage.getItem("lastPage")){
  return (
    <div className='Backgroundlog'>
      <div className='logotext col-lg-5 '>
      <img src={logoiconimage} alt="" srcset="" className='avatar'/>
      <h1>QCU ONLINE CLASSROOM</h1>
      </div>
    <div className='Logincontainer primary'>
      
      <img src={logoiconimage1} alt="" srcset="" className='avatar'/>
      <h1>Login</h1>

      <form className='form-group-form' autoComplete="off"
      onSubmit={handleFormSubmit}>

  
        <label> Username:<div className='errortext'>{usernamemessage}</div></label>
            <input type="text" placeholder='Username...' defaultValue ={username} onChange={handleUsernameChange}/>
            

        <label> Password:<div className='errortext'>{passmessage}</div> </label>

            <input type="password" placeholder='password...' defaultValue ={password} onChange={handlePasswordChange}/>

        <button type="submit" className='buttonsubmit secondary'>login
        </button>

        </form>
         
    </div> 
    </div> 
  )
  }
}



export default Login
