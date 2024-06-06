import connectToMongo from './database/db.js';
import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/payment.js';

connectToMongo();
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello');
});
app.use('/api/payment', paymentRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
