import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt';
import pool from './db.js';

export default function initPassport(passport) {
    passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = res.rows[0];
            if (!user) return done(null, false, { message: 'Email does not exist.' });
            const match = await bcrypt.compare(password, user.password_hash);
            if (!match) return done(null, false, { message: 'Incorrect Password' });
            delete user.password_hash;
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const res = await pool.query('SELECT id, name , email FROM users WHERE id = $1', [id]);
            const user = res.rows[0];
            done(null, user || null);
        } catch (err) {
            done(err);
        }
    });
}