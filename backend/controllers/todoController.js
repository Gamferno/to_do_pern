import pool from "../config/db.js";

export const getToDo = async(req , res) => {
    try {
        const {rows} = await pool.query("SELECT * FROM user_todo"); 
        // console.log(rows);
        res.json(rows);
        // console.log(res);
    } catch (error) {
        next(err);
    }
};
export const createToDo = async(req , res) => {
    try {
        const { description } = req.body;
        const { rows } = await pool.query('INSERT INTO user_todo(description) VALUES ($1) RETURNING *', [description]);
        res.status(201).json(rows[0]);
    } catch (error) {
        next(error);

    }
};

export const updateToDo = async(req , res,next) => {
    try {
        const {description} = req.body;
        const id = req.params.id;
        const {rows} = await pool.query('UPDATE user_todo SET description = $1 WHERE id=$2 RETURNING *', [description, id]);
        res.status(201).json(rows[0]);

    } catch (error) {
        next(error);
    }
};
export const deleteToDo = async(req , res,next) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM user_todo WHERE id=$1',[id]);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
};