import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const StudentDetail = () => {
  const [student, setStudent] = useState({});
  const [paymentList, setPaymentList] = useState([]);
  const [course, setCourse] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getStudentDetail();
  }, []);

  const getStudentDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:4200/student/student-detail/${params.id}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      setStudent(res.data.studentDetail);
      setPaymentList(res.data.feeDetail);
      setCourse(res.data.courseDetail);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong...');
    }
  };

  const DeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(`http://localhost:4200/student/${studentId}`, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        });
        toast.success('Student data deleted');
        navigate(`/dashboard/course-detail/${course._id}`);
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong...');
      }
    }
  };

  return (
    <div className='student-detail-main-wrapper'>
      <div className='student-detail-wrapper'>
        <div className='student-detail-header'>
          <h2>Student Full Detail</h2>
          <div className='st-btn-container'>
            <button
              className='Update-btn'
              onClick={() => navigate(`/dashboard/update-student/${student._id}`, { state: { student } })}
            >
              Edit
            </button>
            <button className='Delete-btn' onClick={() => DeleteStudent(student._id)}>
              Delete
            </button>
          </div>
        </div>

        <div className='sd-detail'>
          <img src={student.imageUrl} alt='student' />
          <div>
            <h3>{student.fullName}</h3>
            <p>Phone: {student.phone}</p>
            <p>Email: {student.email}</p>
            <p>Address: {student.address}</p>
            <h4>Course Name: {course.courseName}</h4>
          </div>
        </div>

        <h2 className='payment-history-title'>Payment History</h2>
        <div className='fee-detail-wrapper'>
          <table>
            <thead>
              <tr>
                <th>Date and Time</th>
                <th>Amount</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {paymentList.map((payment) => (
                <tr key={payment._id}>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;

