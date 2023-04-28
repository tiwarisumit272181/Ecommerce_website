const express = require('express')
const router = express.Router();

const { getProducts, newProduct,getSingleProduct, updateProduct, deleteProduct, createReview, getProductReviews, deleteProductReviews, deleteProductReview} = require('../controllers/productController')
const { isAuthenticated, authorizeRoles }= require('../middleware/auth');

router.route('/products').get(getProducts);
router.route('/admin/product/new').post(isAuthenticated,authorizeRoles('admin'),newProduct);
router.route('/review').put(isAuthenticated,createReview);

router.route('/product/:id').get(getSingleProduct);

router.route('/reviews').get(isAuthenticated,getProductReviews);
router.route('/review').delete(isAuthenticated,deleteProductReview);

router.route('/admin/product/:id').put(isAuthenticated,authorizeRoles('admin'),updateProduct).delete(isAuthenticated,authorizeRoles('admin'),deleteProduct);
module.exports = router;