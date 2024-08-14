import { Router } from "express";
import registerUser from "../controllers/user.controller.js";

const router = Router()


router.route("/reg").get(registerUser)
export default router;