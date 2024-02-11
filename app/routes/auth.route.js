import express from "express";
import {
        registerController,
        loginController,
    } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
    res.status(200).json({ message: "ok" });
});
authRouter.post("/register", registerController);
authRouter.post("/login", verifyToken, loginController);

export default authRouter;
