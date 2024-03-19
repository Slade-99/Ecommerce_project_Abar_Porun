import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  updateProductController,
  searchProductController,
  braintreeTokenController,
  brainTreePaymentController,
  productCategoryController,
  createInvoice,
 
} from "../controllers/productController.js";
import {  requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { billingController, billingControllerAll } from "../controllers/billingController.js";

const router = express.Router();

//routes
router.post("/create-product",requireSignIn, isAdmin,formidable(),createProductController);
//routes
router.put("/update-product/:pid",requireSignIn, isAdmin,formidable(),updateProductController);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);




//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);


//create product billing
router.post("/billing", billingController);

//create invoice
router.post("/invoice", createInvoice);

//All product billing
router.get("/billing-all", billingControllerAll);


//search product
router.get("/search/:keyword", searchProductController);


//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

//category wise product
router.get("/product-category/:slug", productCategoryController);


//category wise product


export default router;