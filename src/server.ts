import express from 'express';
import mongoose from 'mongoose';
import stockRoutes from './routes/stockRoutes';
import morgan from 'morgan';
import logger from './utils/logger'
import cors from 'cors';
import dbConnect from './config/dbConnect';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env fil

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()), // Log requests with Winston
    },
  })
);
// MongoDB connection
dbConnect()
app.use('/api/stocks',stockRoutes)


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
