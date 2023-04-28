const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const UserController = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
// Checks if user is authenticated or not.
exports.isAuthenticated = catchAsyncError(async (req,res,next)=>{
    const  { token } =req.cookies;
    if(!token){
        return next(new ErrorHandler('Login first to access this resource.'));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await UserController.findById(decoded.id);
    next();
})

//handling user roles

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`,403));
        }
        next();
    }
}