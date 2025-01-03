import express from 'express';
import trimRequest from "trim-request"
import { login, logout, refreshToken, register } from '../controllers/auth.controller.js';

const router = express.Router();

// trimRequest -> Express all body, query any user in request like 'foooo    ' so it is trim to 'foooo' 
router.route('/register').post(trimRequest.all, register)
router.route('/login').post(trimRequest.all, login)
router.route('/logout').post(trimRequest.all, logout)
router.route('/refreshToken').post(trimRequest.all, refreshToken)

export default router;