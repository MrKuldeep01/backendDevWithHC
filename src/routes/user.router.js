import { Router } from "express";
import {loginUser, logoutUser, registerUser} from "../controllers/user.controller.js";
import { upload } from "../middelware/multer.middelware.js";
import { authUser } from "../middelware/auth.middleware.js";
const router = Router();

router.route("/reg").post(upload.fields([{
    name:"avatar",
    maxCount:1
}, {
    name:"coverImg",
    maxCount:1
}]), registerUser);

router.route("/login").post(loginUser)
router.route("/logout").post(authUser, logoutUser)


export default router;
