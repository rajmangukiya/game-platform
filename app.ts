import express, { Application } from "express";
import { setup } from "./src/api/routes";
import { errors } from "celebrate";
import dotenv from "dotenv";
import { setSwagger } from './src/utils/swagger';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(express.json());

setSwagger(app);
setup(app);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
})