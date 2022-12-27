import express from "express";
import { getUser, Register, Login, Logout, Resend, Verification, Forget, joinGroup, createGroup} from "../controllers/users.js";
import { submitPost, editPost, deletePost, showPost, editComment, submitComment, deleteComment, showEvent, search, showProduct, addProduct, buyProduct} from "../controllers/feed.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

import { CR_verification, changeDP, changePassword, createEvent, showOrders} from "../controllers/profile.js";
 
const router = express.Router();
 
router.use('/uploads', express.static('uploads'));
router.post('/register', Register);
router.post('/post', submitPost);
router.post('/edit_post', editPost);
router.post('/del_post', deletePost);
router.post('/comment', submitComment);
router.post('/edit_comment', editComment);
router.post('/del_comment', deleteComment);
router.post('/search', search);
router.get('/registerr', Resend);

router.post('/verify', Verification);
router.post('/forget', Forget);
router.post('/joingroup', joinGroup);
router.post('/creategroup', createGroup);

router.get('/register', verifyToken);
router.get('/getuser', getUser);
router.post('/getpost', showPost);
router.post('/getevent', showEvent);
router.post('/getproduct', showProduct);
router.post('/addproduct', addProduct);
router.post('/buy', buyProduct);
router.get('/token', refreshToken);

router.post('/cr_verify', CR_verification);
router.post('/dp', changeDP);
router.post('/pass_verify', changePassword);
router.post('/postevent', createEvent);
router.post('/getorders', showOrders);

router.post('/login', Login);
router.delete('/logout', Logout);
 
export default router;