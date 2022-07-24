import { Router } from 'express';
import { getCustomers, getCustomersById, postCustomers } from '../controllers/customersController.js';

const router = Router();
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomersById);
router.post('/customers', postCustomers);
router.put('/customers:id');

export default router;