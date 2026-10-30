import express, { json } from "express";
import { env } from "./config/env.service.js";
import { databaseConnection } from "./database/connection.js";
import authRouter from "./module/auth/auth.controller.js";
import messageRouter from './module/message/message.controller.js'
import { globalHandlingError } from "./common/index.js";
import {fileURLToPath} from 'url'
import path from "path";
import { redisConnection } from "./database/redis/connection.js";
const app = express();

app.use(json());
export const client = await redisConnection()
await redisConnection()
databaseConnection();



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.resolve(__dirname, '../uploads')

app.use('/uploads', express.static(filePath));


app.use("/auth", authRouter);
app.use("/messages", messageRouter);

app.use(globalHandlingError);

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port} in ${env.mood} mode`);
});
