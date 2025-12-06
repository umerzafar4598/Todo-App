import express from "express";
import bcrypt from "bcrypt";
import pool from '../db.js';
import passport from "passport";


const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Missing Fields' });
        const userExists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (userExists.rows.length) return res.status(409).json({ message: 'Email already taken' });
        const hash = await bcrypt.hash(password, 15);
        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email', [name, email, hash]);
        const user = result.rows[0];
        req.login(user, (err) => {
            if (err) return res.status(409).json({ message: 'Login Failed after Registeration' });
            return res.json({ user })
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info?.message || 'Login Failed' });
        req.login(user, (err) => {
            if (err) return next(err);
            res.json({ user });
        });
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: 'Logout Failed' });
        res.json({ message: 'Logged out' });
    })
})


router.get('/me', (req, res) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) return res.status(401).json({ user: null });
    res.json({ user: req.user });
});

export default router;