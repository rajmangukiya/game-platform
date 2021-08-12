import express from 'express';
import { login, signup } from '../controllers/user';

export const userRouter = express.Router();

/**
 * @swagger
 * /user/auth/signup:
 *  post:
 *    tags: [User]
 *    description: User registration
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          first_name:
 *            type: string
 *          last_name:
 *            type: string
 *          email:
 *            type: string
 *          mobile:
 *            type: string
 *          password:
 *            type: string
 *          api_key:
 *            type: string
 *    responses:
 *      200:
 *        description: Success
 *        content: {}
 *
 */
userRouter.post('/auth/signup', signup.validator, signup.controller);

/**
 * @swagger
 * /user/auth/login:
 *  post:
 *    tags: [User]
 *    description: User login
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *    responses:
 *      200:
 *        description: Success
 *        content: {}
 *
 */
userRouter.post('/auth/login', login.validator, login.controller);