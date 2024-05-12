const { Router } = require("express")
const router = Router()

const { verifyToken } = require("../../middlewares/verifyToken")
const validate = require("../../middlewares/validate")
const { userValidation } = require("../../validations")
const { userController } = require('../../controllers')


// router.route("/list_all_customer").post(validate(userValidation.listAllCustomer), userController.listAllCustomer)
router.route("/create_user").post(validate(userValidation.createUser), userController.createUser)
router.use(verifyToken);
router
    .route("/user_by_id")
    // .get(userController.customerById)
    .put(validate(userValidation.userById), userController.updateCustomerById)
// router.get("/list_sales_rep", userController.listSalesRep);
// router.get("/list_driver", userController.listDriver);
// router.post("/upload_file", userController.uploadFilesAws);
// router.get("/get-auth-user", verifyToken, userController.getAuthUser)
// router.get("/:user_id", userController.userById);

module.exports = router