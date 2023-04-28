const Product = require('../models/product.js')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
 
const APIFeatures = require('../utils/apiFeatures');

exports.newProduct = catchAsyncError( async(req,res,next)=>{
    
    req.body.user= req.user.id;
    

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});
//get all products => /api/v1/products?keyword=apple

exports.getProducts = catchAsyncError( async(req, res , next) => {
const resPerPage=8;
 const productsCount = await Product.countDocuments();
 const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter().pagination(resPerPage);
 const products = await apiFeatures.query;
 console.log(productsCount);

    res.status(200).json({ 
        success: true,
        productsCount:productsCount,
        resPerPage,
        products
    })
 
} );

//get single product details /api/v1/prodcut/:id

exports.getSingleProduct = catchAsyncError( async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler('Product not found',404));
    }else
    {
        return res.status(200).json({
            success: true,
            product
        })
    }
});

//update product /api/v1/admin/product/:id

exports.updateProduct = catchAsyncError( async(req,res,next) =>{
    let product = await Product.findById(req.params.id);
    if(!product)
    {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        useAndModify: false
    });
    res.status(200).json({
        success: true,
        yes: true,
        product
    })

}
);
//update product /api/v1/admin/product/:id

exports.deleteProduct =catchAsyncError(  async(req,res,next) =>{
    let product = await Product.findById(req.params.id);
    if(!product)
    {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    product.deleteOne();
    res.status(200).json({
        success:true,
        message: "Product Deleted!"
    });

});

// Create new review => /api/v1/review

exports.createReview = catchAsyncError(async(req,res,next) =>{
    const {rating, comment , productId}= req.body;
    const review ={
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        r=> r.user.toString() === req.user._id.toString()
    );
    if(isReviewed)
    {
       product.reviews.forEach(review=>{
        if(review.user.toString() === req.user._id.toString())
        {
            review.comments= comment;
            review.rating= rating;
        }
       })
    }else
    {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }
    product.ratings =product.reviews.reduce((acc,item)=> item.rating+acc,0 )/product.reviews.length;
    await product.save({validateBeforeSave:false});
    res.status(201).json({
        success: true
    })
});

// get Product Reviews => /api/v1/reviews

exports.getProductReviews = catchAsyncError( async(req,res,next) =>{
    const product = await Product.findById(req.query.id);
    if(!product)
    {
        return next(new ErrorHandler('product not found',404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
});

//delete review => /api/v1/review


exports.deleteProductReview = catchAsyncError( async(req,res,next) =>{
    const product = await Product.findById(req.query.productId);
    if(!product)
    {
        return next(new ErrorHandler('product not found',404));
    }
    console.log(req.query.id);
    const reviews = product.reviews.filter(review => review._id.toString()!==req.query.id.toString());
    const numOfReviews = reviews.length;
    const rating =product.ratings =product.reviews.reduce((acc,item)=> item.rating+acc,0 )/product.reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        rating,
        numOfReviews
    },{
    new: true,
    runValidators: true,
    useAndModify: false
});
    res.status(200).json({
        success: true
    })
});