import express from "express";
import authRouter from "./auth.route.js";
// import toDo from "./toDo.route.js";
// import { logger } from "../middlewares/logger.middleware.js";

const routes = express.Router();

//Middlewares use:

//routes.use(logger);
//routes.use("/auth", logger, authRouter);

routes.use("/auth", authRouter);
// routes.use("/todo", toDo);

export default routes;
