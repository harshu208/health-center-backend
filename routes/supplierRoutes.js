const express = require('express');
const router = express.Router();
const {
    getSupplierDetails, 
    addSupplierDetails, 
    getSupplierDetailsById, 
    editSupplierDetailsById,  
    deleteSupplierDetailsById,   
} = require('../controllers/supplierController');

router.get('/suppliers', getSupplierDetails);
router.post('/suppliers', addSupplierDetails);
router.get('/supplier/:id', getSupplierDetailsById);
router.put('/supplier/:id', editSupplierDetailsById);
router.delete('/supplier/:id', deleteSupplierDetailsById);
module.exports = router;