import React, { useState } from 'react'
import '../SignUp/style.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {

  const [email,setEmail]=useState('');
  const [password,setpassword]=useState('');
 const [isLoading,setLoading]= useState(false);
 
 const navigate=useNavigate();

 const submitHandler=(event)=>{
             
event.preventDefault();
setLoading(true);

axios.post('http://localhost:4200/user/login',{
  email:email,
  password:password,

})
.then(res=>{
  setLoading(false);
localStorage.setItem('token',res.data.token)
localStorage.setItem('fullName',res.data.fullName)
localStorage.setItem('imageUrl',res.data.imageUrl)
localStorage.setItem('imageId',res.data.imageId)
localStorage.setItem('email',res.data.email)
  navigate('/Dashboard')

  console.log(res)
})
.catch(err=>{
  setLoading(false);
  toast.error('something is wrong...')
  console.log(err)
})


 }



  return (
    <div className='SignUp-wrapper'>
        <div className='sign-box'>

<div className='signup-left'>

    <img alt='book-logo' src={require('../assets/book-logo.jpg')}/>
    <h1 className='signup-left-heading'>Institute Management App</h1>
    <p className='signup-left-para'>manage your all data in easy way...</p>

</div>
<div className='signup-right'>

  
<form  onSubmit={submitHandler} className='Sign-Up-form'>
  <h1 >Login With Your Account </h1>
<input required onChange={e=>{setEmail(e.target.value)}} type='email'  placeholder='Email'></input>
<input required onChange={e=>{setpassword(e.target.value)}} type='password'  placeholder='Password'></input>
<button type='submit'> { isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
<Link className='link' to='/signup'>Create Your Account</Link>
</form>


</div>

</div>
   
    </div>
  )
}

export default Login;