import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Signup from './components/SignUp/Signup';
import { ToastContainer } from "react-toastify";
import  'react-toastify/dist/ReactToastify.css';
import Home from './components/Dashboard/Home';
import Courses from './components/Dashboard/Courses';
import AddCourses from './components/Dashboard/AddCourses';
import Students from './components/Dashboard/Students';
import AddStudent from './components/Dashboard/AddStudent';
import CollectFee from './components/Dashboard/CollectFee';
import PaymentHistory from './components/Dashboard/PaymentHistory';
import CourseDetail from './components/Dashboard/CourseDetail';
import StudentDetail from './components/Dashboard/StudentDetail';


const App = () => {
const MyRouter=createBrowserRouter([
  {path:'',element:<Login/>},
  {path:'login',element:<Login/>},
{path:'signup',element:<Signup/>},
{path:'dashboard',Component:Dashboard,children:[
  {path:'',Component:Home},
  {path:'home',Component:Home},
  {path:'courses',Component:Courses},
  {path:'add-course',Component:AddCourses},
  {path:'students',Component:Students},
  {path:'add-student',Component:AddStudent},
  {path:'collect-fee',Component:CollectFee},
  {path:'payment-history',Component:PaymentHistory},
  {path:'course-detail/:id',Component:CourseDetail},
  {path:'update-course/:id',Component:AddCourses},
  {path:'update-student/:id',Component:AddStudent},
  {path:'student-detail/:id',Component:StudentDetail}




]}

])

  return (
    <>
   <RouterProvider router={MyRouter}/>
<ToastContainer/>
     </>
  )
}




export default App;
