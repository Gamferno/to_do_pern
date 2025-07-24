import express from "express";
import { getToDo , createToDo, updateToDo, deleteToDo} from "../controllers/todoController.js";
const router = express.Router();

router.get("/", getToDo);
router.post("/", createToDo);
router.put("/:id", updateToDo);
router.delete("/:id", deleteToDo);

export default router;