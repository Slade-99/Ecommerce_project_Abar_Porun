import express from 'express'
import { registerController,
    registerController2,
    loginController,
    loginController2,
    testController, 


} from '../controllers/authController.js'
import { requireSignIn } from '../middlewares/authMiddleware.js'



const router = express.Router()


router.post('/register/customer', registerController)
router.post('/register/employee', registerController2)

//LOGIN

router.post('/login/customer', loginController)
router.post('/login/employee', loginController2)
export default router


// Test Route
router.get('/test' , requireSignIn,  testController)