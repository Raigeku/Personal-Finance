import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import transactionsRouter from './routes/transactions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Simple health check
app.get('/', (req, res) => res.send('Finance Tracker API is running 🚀'));

// Transactions routes
app.use('/api/transactions', transactionsRouter);

app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});
