import connectToMongo from './database/db.js';
import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/Payment.js';
import authRoutes from './routes/auth.js';  // Import the auth routes

connectToMongo();
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello');
});
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes); 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
