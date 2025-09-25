import React from 'react'
import '../Dashboard/style.css'
import SideNev from './SideNev'
import { Outlet, useNavigate } from 'react-router-dom'


const Dashboard = () => {
  const navigate=useNavigate();
  const logoutHandler=()=>{
    
     localStorage.clear();
     navigate('/login');
  }
  return (
    <div className='dashboard-main-container'>
    <div className='dashboard-cotaniner'>
      <SideNev/>
      <div className='main-conatainer'>
        <div className='top-main-bar'>
          <div className='logo-container'>
            <img   alt='profile-logo' className='profile-logo' src={localStorage.getItem('imageUrl')}></img>
          </div>
          <div className='profile-container'>
            <h2 className='profile-name'>{localStorage.getItem('fullName')}</h2>
            <button className='logout-btn' onClick={logoutHandler}>Logout</button>
          </div>
        </div>

      <div className='outlet-area'>
        <Outlet/>

      </div>


      </div>

    </div>
    </div>
  )
}

export default Dashboard
