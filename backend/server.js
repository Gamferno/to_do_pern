import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todosRouter from "./routes/todosRouter.js"
const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());
app.use(cors());


app.use("/todos", todosRouter);


app.listen(port, () => {
  console.log("Server is running on port" + port);
});
