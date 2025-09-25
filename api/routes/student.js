const express=require('express')
const router=express.Router();
const checkAuth=require('../middleware/checkAuth');
const Student=require('../model/Student')
const mongoose=require('mongoose')
const cloudinary=require('cloudinary').v2;
const jwt=require('jsonwebtoken');
const Fee=require('../model/Fee')
const Course=require('../model/courses');
const courses = require('../model/courses');
const fileUpload = require('express-fileupload');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET

})



// Add new student
router.post('/add-student', checkAuth, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const verify = jwt.verify(token, 'VeerTech Intitute 123');

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Image is required" });
    }

    console.log("Files received:", req.files.image);

    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);

    const newStudent = new Student({
      _id: new mongoose.Types.ObjectId(), // Correct: new ObjectId()
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      courseId: req.body.courseId,
      uId: verify.uId,
      imageUrl: result.secure_url,
      imageId: result.public_id
    });

    const savedStudent = await newStudent.save();
    res.status(200).json({ newStudent: savedStudent });

  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});




// get all own students

router.get('/all-students',checkAuth,(req,res)=>{
         
    const token=req.headers.authorization.split(' ')[1]
 const verify=jwt.verify(token,'VeerTech Intitute 123');

      Student.find({uId:verify.uId})
      .select('_id uId fullName phone address email courseId imageUrl imageId')
      .then(result=>{
        res.status(200).json({
            students:result
        })
      })
      .catch( err =>{
        res.status(500).json({
            error:err
        })
      })

})

// get student-detail by Id ---(new added)
router.get('/student-detail/:id',checkAuth,(req,res)=>{
     
     
     const token=req.headers.authorization.split(' ')[1]
     const verify=jwt.verify(token,'VeerTech Intitute 123');



Student.findById(req.params.id)
.select('_id uId fullName phone address email courseId imageUrl imageId')
      .then(result=>{
         Fee.find({uId:verify.uId,courseId:result.courseId,phone:result.phone})
        .then(feeData=>{
            Course.findById(result.courseId)
            .then(courseDetail=>{
             res.status(200).json({
            studentDetail:result,
               feeDetail:feeData,
               courseDetail:courseDetail
            })
              
            })
         .catch(err=>{
        console.log(err)
     res.status(500).json({
          error:err
           })
 })
})
        .catch(err=>{
console.log(err)
res.status(500).json({
   error:err
     })
        })
      })
      .catch(err=>{
        res.status(500).json({
          error:err
        })

      })


})


//get own all students for a course
router.get('/all-students/:courseId',checkAuth,(req,res)=>{
         
    const token=req.headers.authorization.split(' ')[1]
 const verify=jwt.verify(token,'VeerTech Intitute 123');

      Student.find({uId:verify.uId,courseId:req.params.courseId })
      .select('_id uId fullName phone address email courseId imageUrl imageId')
      .then(result=>{
        res.status(200).json({
             students:result
        })
      })
      .catch(err=>{
        res.status(500).json({
              error:err
         })
      })

})


//delete student


router.delete('/:id',checkAuth,(req,res)=>{
     const token=req.headers.authorization.split(' ')[1]
 const verify=jwt.verify(token,'VeerTech Intitute 123');
    Student.findById(req.params.id)
    .then(student=>{
        console.log(student)
        if(student.uId==verify.uId){
            Student.findByIdAndDelete(req.params.id)
            .then(result=>{
                cloudinary.uploader.destroy(student.imageId,(deletedImage)=>{
                   res.status(200).json({
                    result:result
                   })
                })

            })
            .catch(err=>{
                res.status(500).json({
                    msg:err
                })
            })


        }
        else{
            res.status(500).json({
                msg:'bad request'
            })
        }
    })
   
})

//update student

// backend/routes/student.js
router.put('/:id', checkAuth, async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verify = jwt.verify(token, 'VeerTech Intitute 123');

        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });

        if (verify.uId !== student.uId) {
            return res.status(403).json({ error: 'You are not eligible to update this data' });
        }

        let updatedStudentData = {
            fullName: req.body.fullName,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            courseId: req.body.courseId,
            uId: verify.uId,
            imageUrl: student.imageUrl,
            imageId: student.imageId
        };

        if (req.files && req.files.image) {
            // Delete old image
            await cloudinary.uploader.destroy(student.imageId);

            // Upload new image
            const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
            updatedStudentData.imageUrl = result.secure_url;
            updatedStudentData.imageId = result.public_id;
        }

        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, updatedStudentData, { new: true });
        res.status(200).json({ updatedStudent });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});



//get lates 5 students data
router.get('/latest-students',checkAuth,(req,res)=>{
        const token=req.headers.authorization.split(' ')[1]
         const verify=jwt.verify(token,'VeerTech Intitute 123');
         Student.find({uId:verify.uId})
         .sort({$natural:-1}).limit(5)
         .then(result=>{
             res.status(200).json({
             students:result
            })
          })  
         .catch(err=>{
            res.status(500).json({
                error:err
             })
         })  
})

module.exports=router;
