const express = require('express');
const router = express.Router();
const {
    getManufacturerDetails, 
    addManufacturerDetails, 
    getManufacturerDetailsById, 
    editManufacturerDetailsById,    
    deleteManufacturerDetailsbyId, 
} = require('../controllers/manufacturerController');

router.get('/manufacturers', getManufacturerDetails);
router.post('/manufacturers', addManufacturerDetails);
router.get('/manufacturers/:id', getManufacturerDetailsById);
router.put('/manufacturers/:id', editManufacturerDetailsById);
router.delete('/manufacturers/:id', deleteManufacturerDetailsbyId);

module.exports = router;