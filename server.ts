import express from 'express';
import userRoutes from './Interfaces/Routes/userRoutes';
import interviewRoutes from './Interfaces/Routes/interviewRoutes';
import quizRoutes from './Interfaces/Routes/quizRoutes';
import { paymentRoutes } from './Interfaces/Routes/PaymentRoutes';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.1.8:3000',
  'https://www.skillpass.org',
  'https://skillpass.vercel.app',
  'https://skillpass-quizzes.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Skillpass Backend API is active and healthy' });
});

app.use('/api/users/auth', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(Server is running on port );
});
