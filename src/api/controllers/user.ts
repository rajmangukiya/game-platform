import { Request, Response } from "express";
import { celebrate } from "celebrate";
import Joi from "joi";
import { bcryptPassword, comparePassword } from "../../utils/bcrypt";
import httpStatus from "http-status";
import { apiResponse } from "../../utils/api-response";
import { getToken } from "../../utils/jwt";
import { getRepository } from "typeorm";
import User from "../entity/User";

const signup = {
  validator: celebrate({
    body: Joi.object().keys({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      user_name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required().min(8),
      nationality: Joi.string().required(),
      mobile: Joi.string().required(),
      dob: Joi.date().required(),
    })
  }),
  controller: async (req: Request, res: Response) => {
    try {

      const userRepo = getRepository(User);

      const checkUser = await userRepo.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (checkUser) {
        return apiResponse(
          res,
          httpStatus.BAD_REQUEST,
          null,
          "Error",
          "User already registered with this email-id"
        )
      };

      const password = await bcryptPassword(req.body.password, parseInt(process.env.SALT));

      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        email: req.body.email,
        password,
        nationality: req.body.nationality,
        mobile: req.body.mobile,
        dob: req.body.dob,
      };

      const user = userRepo.create(newUser);
      const result = await userRepo.save(user);

      if (!result) {
        return apiResponse(
          res,
          httpStatus.BAD_REQUEST,
          null,
          "Error",
          "Error in creating user"
        )
      }

      return apiResponse(
        res,
        httpStatus.OK,
        null,
        "User registered successfully",
        null
      )

    } catch (error) {

      return apiResponse(
        res,
        httpStatus.BAD_REQUEST,
        null,
        "Error",
        "Error in controller: " + error
      )

    }
  }
}

const login = {
  validator: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
  }),
  controller: async (req: Request, res: Response) => {
    try {

      const userRepo = getRepository(User);
      const user = await userRepo.findOne({
        where: { email: req.body.email },
      });

      if (!user) {
        return apiResponse(
          res,
          httpStatus.NOT_FOUND,
          null,
          "Error",
          "User not found with this email id"
        )
      }

      const checkPassword = await comparePassword(req.body.password, user.password);

      if (!checkPassword) {
        return apiResponse(
          res,
          httpStatus.BAD_REQUEST,
          null,
          "Error",
          "Wrong password"
        )
      }

      const token = getToken({
        id: user.id,
      })

      return apiResponse(
        res,
        httpStatus.OK,
        token,
        "Login Successfully",
        null
      )

    } catch (error) {

      return apiResponse(
        res,
        httpStatus.BAD_GATEWAY,
        null,
        "Error",
        "Error in controller: " + error
      )

    }
  }
}

const getUserByToken = {
  validator: celebrate({
    body: Joi.object().keys({

    })
  }),
  controller: async (req: any, res: Response) => {
    try {

      const userRepo = getRepository(User);
      
      const user = await userRepo.findOne({
        where: { id: req.user.id },
      });

      if (!user) {
        return apiResponse(
          res,
          httpStatus.NOT_FOUND,
          null,
          "Error",
          "User not found with this token"
        )
      }

      const result = {
        id: user.id,
        avatar: user.avatar,
        first_name: user.first_name,
        last_name: user.last_name,
        user_name: user.user_name,
        email: user.email,
        nationality: user.nationality,
        mobile: user.mobile,
        dob: user.dob
      }

      return apiResponse(
        res,
        httpStatus.OK,
        result,
        "User got successfull",
        null
      )

    } catch (error) {

      return apiResponse(
        res,
        httpStatus.BAD_GATEWAY,
        null,
        "Error",
        "Error in controller: " + error
      )

    }
  }
}

export {
  signup,
  login,
  getUserByToken
}