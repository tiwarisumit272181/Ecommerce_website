const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError= require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const  cloudinary  = require('cloudinary');

//Register User  => /api/v1/register

exports.registerUser = catchAsyncError(async (req, res, next)=>{
    const {name, email, password,avatar} = req.body;
    console.log();
    const result= await cloudinary.v2.uploader.upload(avatar,{
        folder:'avatars',
        width: 150,
        crop: "scale"
    });
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:result.public_id,
            url:result.secure_url
        }
    })

  /*  const token = user.getJwtToken();
    res.status(201).json({
        succes: true,
        token
    })*/
   sendToken(user, 200,res);
})

//Login User => /api/v1/login

exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password}= req.body;

    //check if email or password is entered by user

    if(!email||!password){
        return next(new ErrorHandler('Please enter email or password',400))
    }

    //finding user in database
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched)
    {
    return next(new ErrorHandler('Invalid Email or Password',401));
    }

   /* const token = user.getJwtToken();

    res.status(200).json({
        success:true,
        token
    });*/
    sendToken(user, 200,res);
});

//Forgot Password => api/v1/password/forgot

exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user)
    {
        return next(new ErrorHandler('User not found',404));
    }

    //Get reset Token

    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    //reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    
    const message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetUrl}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`

        try{
            await sendEmail({
                email: user.email,
                subject:'Password Reset Request',
                message
            });

        }catch(error){
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire = undefined;

            await user.save({validateBeforeSave:false});
            return next(new ErrorHandler(error.message,500));
        }
        res.status(200).json({
            success:true,
            message:'An email has been sent to the user with further instructions.'
        })

}
);

//Get currently logged in user

exports.getUserProfile = catchAsyncError(async (req,res,next)=>{
  const user  = await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user
  });
});
//Logout user => /api/v1/logout

exports.logout = catchAsyncError(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:'Logged out successfully'
    })

});

// Change password => /api/v1/password/update
 
exports.updatePassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password');

    //check previous user password

    const isMatched = await user.comparePassword(req.body.oldPassword);
    
    if(!isMatched)
    {
        return next(new ErrorHandler('Old password is incorrect',401));
    }
    user.password = req.body.newPassword;
    await user.save();

    sendToken(user,200,res);

    sendToken

});
//Reset Password => api/v1/password/reset/:token

exports.resetPassword = catchAsyncError(async(req,res,next)=>{

    //Hash Url Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    console.log(resetPasswordToken);
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt :Date.now() }
    });
    if(!user)
    {
        console.log(user+"");
       return next(new ErrorHandler('Password reset Token is invalid or has been expired')); 
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match'));
    }

    //setup new password
   
    user.password = req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user,200,res);

});

//update user profile

exports.upadateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData={
    name: req.body.name,
    email: req.body.email
  }
   //Update avatar
   if(req.body.avatar!=='')
   {
       const user = await User.findByIdAndUpdate(req.user.id);
       const img_id = user.avatar.public_id;
       const res= await cloudinary.v2.uploader.destroy(img_id);
       const result= await cloudinary.v2.uploader.upload(req.body.avatar,{
           folder:'avatars',
           width: 150,
           crop: "scale"
       });
       newUserData.avatar = {
        public_id:result.public_id,
        url:result.secure_url
       }
   }
   
  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new: true,
    runValidators:true,
    useFindAndModify: false 
  });
  res.status(200).json({
    success: true
  });
});

//admin routes

//Get all users

exports.allUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
})

//Get user details => /api/v1/admin/:id

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user)
    {
        return next(new ErrorHandler('User not found',404));
    }
    res.status(200).json({
        success: true,
        user
    });
})

//update user profile => /api/v1/admin/user/:id

exports.upadateUserProfile = catchAsyncError(async (req, res, next) => {
    const newUserData={
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    }
   
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
      new: true,
      runValidators:true,
      useFindAndModify: false 
    });
    res.status(200).json({
      success: true
    });
  });

  exports.deleteUser = catchAsyncError(async(req,res,next)=>{
    const  user = await User.findByIdAndDelete(req.params.id);
    if(!user)
    {
        return next(new ErrorHandler('User not found',404));
    }
   
    res.status(200).json({
        success: true,
        message: `User: ${user.name} has been deleted`,
      });
  });
  