
import express, { json } from 'express';
import { env } from './config/env.service.js';
import { databaseConnection } from './database/connection.js';
import authRouter from './module/auth/auth.controller.js';
import { globalHandlingError } from './common/index.js';

const app = express();

app.use(json());

databaseConnection();

app.use('/auth', authRouter);

app.use(globalHandlingError);

app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port} in ${env.mood} mode`);
});
