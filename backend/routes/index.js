import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

import { getUser, Register, Login, Logout, Resend, Verification, Forget, joinGroup, createGroup, createClub, joinClub, showClubs, showMembers, showMod} from "../controllers/users.js";
import { submitPost, editPost, deletePost, showPost, editComment, submitComment, deleteComment, showEvent, search, showProduct, addProduct, buyProduct, showSession, bookSession} from "../controllers/feed.js";
import { CR_verification, changeDP, changePassword, createEvent, showOrders, showProductOrders, showMyProduct, changeStatus,deleteProduct,deleteOrder} from "../controllers/profile.js";
 
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
router.post('/getMod', showMod);

router.post('/createclub', createClub);
router.post('/joinclub', joinClub);
router.post('/getclubs', showClubs);
router.post('/getmembers', showMembers);
router.post('/getsession', showSession);
router.post('/book', bookSession);

router.get('/register', verifyToken);
router.get('/getuser', verifyToken, getUser);
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
router.post('/getproductorders', showProductOrders);
router.post('/getmyproduct', showMyProduct);
router.post('/changestatus', changeStatus);
router.post('/del_product', deleteProduct);
router.post('/del_order', deleteOrder);

router.post('/login', Login);
router.delete('/logout', Logout);
 
export default router;