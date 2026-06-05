import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import env from './config/env.js';
import routes from './routes/index.js';
import { globalLimiter } from './middlewares/rateLimiter.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  })
);
app.use(morgan(env.isProduction ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(globalLimiter);

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
