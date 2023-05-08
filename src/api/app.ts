import express from "express";
import { router } from "../routes/router";
import { morganMiddleware } from "../middleware/morganMiddleware";

export const app = express();

//JSON middleware
app.use(express.json());

// Middleware
app.use(morganMiddleware);

// Test router
app.use("/api", router);


