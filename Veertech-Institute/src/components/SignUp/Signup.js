import React, { useState } from 'react'
import '../SignUp/style.css'
import axios from 'axios';
import {toast} from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';



const Signup = () => {
  const [fullName,setFullName]=useState('');
  const [email,setEmail]=useState('');
  const [phone, setPhone]=useState('');
  const [password,setpassword]=useState('');
 const [image,setImage]=useState(null);
 const [imageUrl,setImageUrl]=useState('');
 const [isLoading,setLoading]= useState(false);
 
 const navigate=useNavigate();

 const submitHandler=(event)=>{
             
event.preventDefault();
setLoading(true);
const formData=new FormData();
formData.append('fullName',fullName)
formData.append('email',email)
formData.append('phone',phone)
formData.append('password',password)
formData.append('image',image)
axios.post('http://localhost:4200/user/signup',formData)
.then(res=>{
  setLoading(false);
  toast.success('your account is created..')
  navigate('/login')

  console.log(res)
})
.catch(err=>{
  setLoading(false);
  toast.error('something is wrong...')
  console.log(err)
})


 }

 const fileHandler=(e)=>{
  setImage(e.target.files[0])
  setImageUrl(URL.createObjectURL(e.target.files[0]))
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
  <h1 >Create Your Account  </h1>
<input required onChange={e=>{setFullName(e.target.value)}} type='text'  placeholder='Full Name'></input>
<input required onChange={e=>{setEmail(e.target.value)}} type='email'  placeholder='Email'></input>
<input required onChange={e=>{setPhone(e.target.value)}}  type='phone'  placeholder='Phone Number'></input>
<input required onChange={e=>{setpassword(e.target.value)}} type='password'  placeholder='Password'></input>
<input required onChange={fileHandler} type='file'/>
{imageUrl && <img className='your-logo' alt='your logo' src={imageUrl}/>}


<button type='submit'> { isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
<Link  className='link' to='/login'>Login With Your Account</Link>

</form>


</div>

</div>
   
    </div>
  )
}

export default Signup
