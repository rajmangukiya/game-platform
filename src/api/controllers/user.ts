import { Request, Response } from "express";
import { celebrate } from "celebrate";
import Joi from "joi";
import { bcryptPassword, comparePassword } from "../../utils/bcrypt";
import httpStatus from "http-status";
import { apiResponse } from "../../utils/api-response";
import { getToken } from "../../utils/jwt.js";

const signup = {
  validator: celebrate({
    body: Joi.object().keys({
      
    })
  }),
  controller: async (req: Request, res: Response) => {
    try {

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
      
    })
  }),
  controller: async (req: Request, res: Response) => {
    try {

      return apiResponse(
        res,
        httpStatus.OK,
        "token",
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

export {
  signup,
  login
}