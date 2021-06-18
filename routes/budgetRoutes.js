const express = require('express');
const router = express.Router();
const {
    getBudgetDetails, 
    addBudgetDetails, 
    getBudgetDetailsById, 
    editBudgetDetailsById, 
    deleteBudgetDetailsById,
} = require('../controllers/budgetController');

router.get('/budget', getBudgetDetails);
router.post('/budget', addBudgetDetails);
router.get('/budget/:id', getBudgetDetailsById);
router.put('/budget/:id', editBudgetDetailsById);
router.delete('/budget/:id', deleteBudgetDetailsById);

module.exports = router;