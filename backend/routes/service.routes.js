const express = require('express');
const router = express.Router();
const { 
    getServices, 
    createService, 
    updateService, 
    deleteService 
} = require('../controllers/service.controller.js');

// Definimos los endpoints que pide el ticket
router.get('/', getServices);
router.post('/', createService); // A futuro acá le meten el middleware de auth
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;