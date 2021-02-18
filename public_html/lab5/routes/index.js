var express = require('express');
var router = express.Router();
var ctrlEmpl = require('./employee.controller')

/* GET employees. */
router.get('/employees', ctrlEmpl.emplReadAll)
router.get('/employees/:id', ctrlEmpl.emplReadOne)
router.post('/employees', ctrlEmpl.emplCreate)
router.put('/employees/:id', ctrlEmpl.emplUpdateOne)
router.delete('/employees/:id',ctrlEmpl.emplDeleteOne)

// searching
router.get('/employees/search/:columnName/:searchValue', ctrlEmpl.emplSearchBy)

// sorting 
router.get('/employees/search/:column/:order', ctrlEmpl.emplSortByColumn)


module.exports = router;
