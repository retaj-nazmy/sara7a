import express, {json} from 'express';
import { env } from './config/env.service.js';
import { databaseConnection } from './database/connection.js';
import authRouter from './module/auth/auth.controller.js';

const app = express();
app.use(json());

databaseConnection()
app.use('/auth', authRouter)

app.use((err, req, res, next)=>{
  let stack = env.mood == "dev" ? err.stack : null
  const status = err.cause?err.cause.status :500
  res.status(status).json({message: err.message ,stack})
})
app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port} in ${env.mood} mode`);
})
