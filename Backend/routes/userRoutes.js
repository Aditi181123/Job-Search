import express from "express";
import authenticated from "../middleware/authenticate";
import { register, login, logout, updateProfile } from "../controllers/user";
import { singleUpload } from "../middleware/mutler";

const router = express.Router();

router.route("/register", singleUpload, register);

router.route("/login", login);

router.route("/logout", logout);

router.route("/profile/update", authenticated, singleUpload, updateProfile);

export default router;