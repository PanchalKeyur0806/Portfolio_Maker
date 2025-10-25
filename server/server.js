import app from "./index.js";
import mongoose from "mongoose";

mongoose
  .connect(process.env.DB_STR)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`server is running http://localhost:${process.env.PORT}`);
});
