import express from 'express';
import { getUserByToken, login, signup } from '../controllers/user';

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

userRouter.post('/auth/login', login.validator, login.controller);
  
userRouter.get('/getUser', getUserByToken.validator, getUserByToken.controller);