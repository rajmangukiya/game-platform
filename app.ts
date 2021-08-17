import express, { Application } from "express";
import { setup } from "./src/api/routes";
import { errors } from "celebrate";
import { development } from "./src/database/config";
import dotenv from "dotenv";
import { setSwagger } from "./src/utils/swagger";
import { createConnection } from "typeorm";
import cors from "cors"

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })) // do not know the exactly use
app.use(cors({
  origin: 'http://localhost:3000'
}))

setSwagger(app);
setup(app);
app.use(errors());

createConnection(development)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  })
  .catch((e) => {
    console.log("Error: ", e);
  });