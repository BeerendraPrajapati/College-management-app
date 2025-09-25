import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCourses = () => {
  const [courseName,setCourseName] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState('');
  const [startingDate,setStartingDate] = useState('');
  const [endDate,setEndDate] = useState('');
  const [image,setImage] = useState(null);
  const [imageUrl,setImageUrl] = useState('');
  const [isLoading,setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.state){
      const c = location.state.course;
      setCourseName(c.courseName);
      setDescription(c.description);
      setPrice(c.price);
      setStartingDate(c.startingDate);
      setEndDate(c.endDate);
      setImageUrl(c.imageUrl);
    } else {
      setCourseName('');
      setDescription('');
      setPrice('');
      setStartingDate('');
      setEndDate('');
      setImageUrl('');
    }
  }, [location]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('courseName', courseName);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('startingDate', startingDate);
      formData.append('endDate', endDate);
      if(image){ 
        formData.append('image', image);
      }

      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }

      let res;
      if(location.state){
        res = await axios.put(`http://localhost:4200/course/${location.state.course._id}`, formData, config);
        toast.success('Course updated successfully');
        navigate(`/dashboard/course-detail/${location.state.course._id}`);
      } else {
        res = await axios.post('http://localhost:4200/course/add-course', formData, config);
        toast.success('New course added successfully');
        navigate('/dashboard/courses');
      }

      console.log(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      <form onSubmit={submitHandler} className='form'>
        <h1>{location.state ? 'Edit Course':'Add New Course'}</h1>
        <input value={courseName} required onChange={e => setCourseName(e.target.value)} placeholder='Course Name' type='text'/>
        <input value={description} required onChange={e => setDescription(e.target.value)} placeholder='Description' />
        <input value={price} required onChange={e => setPrice(e.target.value)} placeholder='Price' type='number'/>
        <input value={startingDate} required onChange={e => setStartingDate(e.target.value)} placeholder='Starting Date' type='date'/>
        <input value={endDate} required onChange={e => setEndDate(e.target.value)} placeholder='End Date' type='date'/>
        <input required={!location.state} onChange={fileHandler} type='file' />
        {imageUrl && <img className='your-logo' alt='Course' src={imageUrl}/>}
        <button type='submit' className='submit-btn'>
          {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>} Submit
        </button>
      </form>
    </div>
  )
}

export default AddCourses;

