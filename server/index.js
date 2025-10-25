import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import portfolioRoutes from "./src/portfolioRoutes.js";
import { errorHandler } from "./src/errorController.js";

dotenv.config({
  path: ".env",
});

const __dirname = path.resolve();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/portfolio", portfolioRoutes);

app.use(errorHandler);

export default app;
