import express from 'express'
import { registerController,
    registerController2,
    loginController,
    loginController2,
    testController,
    forgotPasswordController,
    forgotPasswordController2,
    getSingleCustomer,
    updateCustomer,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
    reviewController,
    recommendationController, 


} from '../controllers/authController.js'
import { requireSignIn,isAdmin } from '../middlewares/authMiddleware.js'



const router = express.Router()


router.post('/register/customer', registerController)
router.post('/register/customer/recommendation', recommendationController)
router.post('/register/employee', registerController2)

//LOGIN

router.post('/login/customer', loginController)
router.post('/login/employee', loginController2)


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



//singleCustomer
router.get("/get-customer/:ID", getSingleCustomer);

//UpdateCustomer
router.put("/update-customer/:ID", updateCustomer);


//orders
router.get("/orders/:ID", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);


// submit review
router.post("/review", reviewController);


export default router;