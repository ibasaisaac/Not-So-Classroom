import express from "express";
import { Register, Login, Logout, Resend, Verification, Forget} from "../controllers/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
 
const router = express.Router();
 

router.post('/register', Register);
router.get('/registerr', Resend);

router.post('/verify', Verification);
router.post('/forget', Forget);

router.get('/register', verifyToken);
router.get('/token', refreshToken);

router.post('/login', Login);
router.delete('/logout', Logout);
 
export default router;