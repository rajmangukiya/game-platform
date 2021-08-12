import { Application } from "express";
import jwt from "express-jwt"
import { privateKey } from "../../utils/jwt.config"
import { userRouter } from "./user"

export const setup = (app: Application) => {
  app.use("/api/v1", jwt({ algorithms: ["HS256"], secret: privateKey }).unless({
    path: [
      "/api/v1/user/auth/login",
      "/api/v1/user/auth/signup"
    ]
  }))
  app.use("/api/v1/user", userRouter)
}