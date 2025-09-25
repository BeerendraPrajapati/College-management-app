import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const Courses = () => {
  const [courseList,setCourseList]=useState([]);
  const navigate=useNavigate();

  
  useEffect(()=>{
       getCourses()

  },[])
  const getCourses=()=>{
    axios.get('http://localhost:4200/course/all-courses',{
        headers:{

                Authorization:'Bearer '+localStorage.getItem('token')
            }

    })
     .then(res=>{
                
                console.log(res.data.courses);
                setCourseList(res.data.courses)
          

            })
            .catch(err=>{
        
                console.log(err)
                toast.error('something is wrong..')
    
            })
  }
  return (
    <div className='course-wrapper'>
 {

  courseList.map((course)=>(
    <div onClick={()=>{navigate('/dashboard/course-detail/'+ course._id )}} className='course-box' key={course._id}>
   <img alt='course-thumnail' className='course-thumnail' src={course.imageUrl}/>
      <h5 className='course-name'>{course.courseName}</h5>
      <p className='price'>Rs. {course.price}   Only</p>
    </div>
  )) 
 }
    </div>
  )
}

export default Courses
