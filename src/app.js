import express from "express";
import apiRouter from "./routers/api.router.js";

const app = express();

app.use(express.json()).use("/api", apiRouter);
export default app;
