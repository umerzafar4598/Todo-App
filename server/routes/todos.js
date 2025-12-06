import express from "express";
import pool from "../db.js";

const router = express.Router();

function ensureAuth(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) return next();
    return res.status(401).json({ message: 'Unauthorized' });
}
router.use(ensureAuth);

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id , title, deadline, completed, created_at, updated_at FROM todos WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
        res.json({ todos: result.rows })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, deadline } = req.body;

        const result = await pool.query(
            `INSERT INTO todos (user_id, title, deadline, updated_at)
             VALUES ($1, $2, $3, NOW())
             RETURNING *`,
            [req.user.id, title, deadline]
        );

        res.json({ todo: result.rows[0] });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { title, deadline, completed } = req.body;
        const { id } = req.params;
        const result = await pool.query(
            'UPDATE todos SET title = COALESCE($1, title), deadline = COALESCE($2, deadline) , completed = COALESCE($3, completed), updated_at = NOW() WHERE id = $4 AND user_id = $5 RETURNING id, title, deadline, completed, created_at, updated_at', [title, deadline, completed, id, req.user.id]);
        if (!result.rows.length) return res.status(404).json({ message: 'Todo not Found' });
        res.json({ todo: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING id', [id, req.user.id]);
        if (!result.rows.length) return res.status(404).json({ message: 'Error Deleting Todo' });
        res.json({ message: 'Deleted Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});




export default router;