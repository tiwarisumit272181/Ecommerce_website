const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

//Create new Order => /api/v1/order/new

exports.newOrder = catchAsyncError(async (req,res,next)=>{
  const { 
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
  } = req.body;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id
  });
  res.status(200).json({
    success: true,
    order});
});

//get single order => api /v1/ordere/:id

exports.getSingleOrder = catchAsyncError(async (req, res,next) => {

    const order  = await Order.findById(req.params.id).populate('user','name  email');
    if(!order)
    {
        return next(new ErrorHandler('No order found with that ID',404));
    }
    res.status(200).json({
        success: true,
        order
    });
});


//get logedIn user order => api /v1/order/my

exports.getMyOrder = catchAsyncError(async (req, res,next) => {

    const order  = await Order.find({ user: req.user.id });
    
    if(!order)
    {
        return next(new ErrorHandler('No order found with that ID',404));
    }
    res.status(200).json({
        success: true,
        order
    });
});

// Get all orders - admin => api/v1/admin/orders

exports.getAllOrders = catchAsyncError(async (req, res,next) => {

    const orders  = await Order.find();
    let totalAmount =0;
    orders.forEach(order=>{
        totalAmount += order.totalPrice;
    });
    
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

// Update / process order - admin api/v1/admin/order/:id

exports.updateOrder = catchAsyncError(async (req, res,next) => {

    const order  = await Order.findById(req.params.id);
    if(order.status==="Delivered")
    {
        return next(new ErrorHandler('Order is already delivered',400));
    }
    order.orderItems.forEach(async item=>{
        await updateStock(item.product,item.quantity);

    } )
    order.orderStatus = req.body.status;
    order.diliveredAt = Date.now();
    order.save();
    res.status(200).json({
        success: true,
        order
    });
});

async function updateStock(id, quantity){
 const product = await Product.findById(id);
 product.stock = product.stock -quantity;
 await product.save({validateBeforeSave:false});
}

// delete order => api/v1/order/:id
exports.deleteOrder = catchAsyncError(async (req, res) => {

    const order  = await Order.findByIdAndDelete(req.params.id);
    if(!order)
    {
        return next(new ErrorHandler('No order found with that ID',404));
    }
    res.status(200).json({
        success: true,
    });
});


