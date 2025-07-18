import express from "express";
import { 
  adminLogin, 
  createAdmin, 
  getAdminProfile, 
  verifyAdminToken 
} from "../controller/adminAuthController.js";
import { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getProductStats 
} from "../controller/productController.js";
import { authAdmin, checkPermission, superAdminOnly } from "../middleware/adminAuth.js";

const router = express.Router();

// Admin Authentication Routes
router.post('/login', adminLogin);
router.post('/create', createAdmin); // For initial setup - remove in production
router.get('/profile', authAdmin, getAdminProfile);
router.get('/verify-token', authAdmin, verifyAdminToken);

// Product Management Routes
router.get('/products', authAdmin, getProducts);
router.get('/products/stats', authAdmin, checkPermission('canViewStats'), getProductStats);
router.get('/products/:id', authAdmin, getProduct);
router.post('/products', authAdmin, checkPermission('canAddProducts'), createProduct);
router.put('/products/:id', authAdmin, checkPermission('canEditProducts'), updateProduct);
router.delete('/products/:id', authAdmin, checkPermission('canDeleteProducts'), deleteProduct);

export default router;
