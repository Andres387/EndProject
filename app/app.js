import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import routes from "./routes/index.route.js";
import { logger } from "./middlewares/logger.middleware.js";

const app = express();
const port = process.env.APP_PORT;

app.use(bodyParser.json());

// app.use(logger);

app.use("/", routes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
