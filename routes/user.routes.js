import express from "express";
import { register, login, getAllUsers, getSingleUSer, updateUser, deleteSingleUser } from "../controllers/user.controller.js"
const router = express.Router();


router.post("/user", register);
router.post("/user/login", login);
router.get("/user", getAllUsers);
router.get("/user/:id", getSingleUSer)
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteSingleUser)

export default router;
