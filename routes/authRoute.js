import express from 'express'
import { registerController,
    registerController2,
    loginController,
    loginController2,
    testController,
    forgotPasswordController,
    forgotPasswordController2, 


} from '../controllers/authController.js'
import { requireSignIn,isAdmin } from '../middlewares/authMiddleware.js'



const router = express.Router()


router.post('/register/customer', registerController)
router.post('/register/employee', registerController2)

//LOGIN

router.post('/login/customer', loginController)
router.post('/login/employee', loginController2)
export default router

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);
router.post("/forgot-password2", forgotPasswordController2);


// Test Route
router.get('/test' , requireSignIn,  testController)



//protected Routes
router.get('/user-auth',requireSignIn, (req,res) =>{
    res.status(200).send({ok:true})
})


//protected for admin Routes
router.get('/employee-auth',requireSignIn, isAdmin, (req,res) =>{
    res.status(200).send({ok:true})
})