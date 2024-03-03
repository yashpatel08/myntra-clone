const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    getProductsByStatus,
    getProductsByGender,
    getProductsByColor,
    getProductsByPrice,
    getProductsBySearch,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByTypes,
    getProductsByQueries
} = require('../controllers/productController');

router.route('/all').get(getAllProducts);
router.route('/query/price').post(getProductsByPrice);
router.route('/:id').get(getProductById);
router.route('/gender/:gender').get(getProductsByGender);
router.route('/gender/:gender/type/:type').get(getProductsByTypes);
router.route('/color/:color').post(getProductsByColor);
// router.route('/gender/:gender').post(getProductsByGender);
router.route('/status/:status').get(getProductsByStatus);
router.route('/search/:search').get(getProductsBySearch);
router.route('/query/full').post(getProductsByQueries);
router.route('/add').post(addProduct);
// router.route('/:id').put(updateProduct);
// router.route('/:id').delete(deleteProduct);

module.exports = router;