import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CollectFee = () => {

    const [fullName,setFullName]=useState('')
    const [phone,setPhone]=useState('')
    const [amount,setAmount]=useState(0)
    const [remark,setRemark]=useState('');
    const [courseId,setCourseId]=useState('')
    const [courseList,setCourseList]=useState([])

  const[isLoading,setLoading]=useState(false)
  const navigate=useNavigate();
    useEffect(()=>{
      getCourses()
    },[])



    const getCourses = () => {
    axios.get('http://localhost:4200/course/all-courses', {
      headers: {

        Authorization: 'Bearer ' + localStorage.getItem('token')
      }

    })
      .then(res => {

        console.log(res.data.courses);
        setCourseList(res.data.courses)

      })
      .catch(err => {

        console.log(err)
        toast.error('something is wrong..')

      })
  }

    const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true)
          axios.post('http://localhost:4200/fee/add-fee',{

                  fullName:fullName,
                  amount:amount,
                  phone:phone,
                  remark:remark,
                  courseId:courseId

          },
          { 
             

      headers: {

        Authorization: 'Bearer ' + localStorage.getItem('token')
      }

    })
      .then(res => {
        setLoading(false)
        console.log(res.data);
        toast.success('Fee Paid...')
        navigate('/dashboard/payment-history')
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        toast.error('something is wrong..')

      })

    }


  return (
    <div>
   <form  onSubmit={submitHandler} className='Sign-Up-form'>
  <h1 >Collect Fee  </h1>
<input required onChange={e=>{setFullName(e.target.value)}} type='text'  placeholder='Full Name'></input>
<input required onChange={e=>{setPhone(e.target.value)}} type='tel'  placeholder='Phone'></input>
<input required onChange={e=>{setAmount(e.target.value)}}  type='number'  placeholder='Amount'></input>
<input required onChange={e=>{setRemark(e.target.value)}} type='text'  placeholder='Remark'></input>
   <select  value={courseId} onChange={(e) => { setCourseId(e.target.value) }}>
          <option>Select Course</option>
          {
            courseList.map((course) => (
              <option key={course._id} value={course._id}>{course.courseName}</option>
            ))
          }
        </select>
<button type='submit'> { isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>

</form>
    </div>
  )
}

export default CollectFee
