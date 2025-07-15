import express from 'express';

// Controllers
import {
  userLogin,
  userRegister
} from '../controllers/auth.controller.js';

// Middleware
const router = express.Router();

// ===================== AUTH =====================
router.post('/login', userLogin);
router.post('/register', userRegister);

export default router;
