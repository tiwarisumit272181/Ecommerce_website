const express = require('express');
const router = express.Router();

const { newOrder, getSingleOrder, getMyOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

const {isAuthenticated, authorizeRoles} = require('../middleware/auth');

router.route('/order/new').post(isAuthenticated,newOrder);

router.route('/order/:id').get(isAuthenticated,getSingleOrder);

router.route('/orders/my').get(isAuthenticated,getMyOrder);

router.route('/admin/orders').get(isAuthenticated,getAllOrders,authorizeRoles('admin'));

router.route('/admin/order/:id').put(isAuthenticated,updateOrder,authorizeRoles('admin'))
                                .delete(isAuthenticated,deleteOrder,authorizeRoles('admin'));
module.exports = router;