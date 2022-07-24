import { Router } from 'express';
import { getCustomers, getCustomersById } from '../controllers/customersController.js';

const router = Router();
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomersById);
router.post('/customers');
router.put('/customers:id');

export default router;