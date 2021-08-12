import jwt from "jsonwebtoken";
import { privateKey } from "./jwt.config";

const getToken = (data: any) => {
  const bearerToken = `Bearer ${jwt.sign(data, privateKey)}`;
  return bearerToken;
}

const decodeToken = (token: string) => {
  const data = jwt.decode(token.slice(6));
  return data;
}

export {
  getToken,
  decodeToken
}