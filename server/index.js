import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config({
  path: ".env",
});

app.use(cors({ origin: "localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

export default app;
