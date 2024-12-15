import express from 'express'
import cookieParser from 'cookie-parser'
import { swaggerConfig } from './src/common/config/swagger.config';
import dotenv from 'dotenv'
import { ErrorHandler, NotfoundError } from './src/common/utils/error.utils';
import IndexRouter from './src/module/index.routes';
dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
swaggerConfig(app)
app.use(IndexRouter)
app.use(NotfoundError);
app.use(ErrorHandler);
app.listen(PORT, () => {
    console.log(`server run: http://localhost:${PORT}/swagger`);
})