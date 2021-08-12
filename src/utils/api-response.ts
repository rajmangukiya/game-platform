import { Response } from "express";


export const apiResponse = (res: Response, status: number, data: any, message: string, error: string) => {
  res
    .status(status)
    .json({
      data,
      message,
      error
    })
}