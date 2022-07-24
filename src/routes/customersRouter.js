import { Router } from 'express';
import { getCustomers, getCustomersById, postCustomers, updateCustomers } from '../controllers/customersController.js';

const router = Router();
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomersById);
router.post('/customers', postCustomers);
router.put('/customers/:id', updateCustomers);

export default router;