import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});



import leadRoutes from './routes/leadRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import marketplaceRoutes from './routes/marketplaceRoutes.js';
import marketplaceRouter from './routes/marketplace.js';
import contentRouter from './routes/content.js';

app.get('/', (req, res) => {
  res.send('InsuranceWeb Backend API running');
});

app.use('/api/leads', leadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
// app.use('/api/marketplace', marketplaceRoutes); // legacy
app.use('/api/marketplace', marketplaceRouter); // nuevo router seguro
app.use('/api/content', contentRouter); // endpoints de contenido cacheado

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
