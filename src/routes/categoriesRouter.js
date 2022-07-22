import { Router } from 'express';
import { getCategories } from '../controllers/categoriesController.js';

const router = Router();
router.get('/categories', getCategories);
router.post('/categories');

export default router;