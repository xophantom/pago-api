import 'dotenv';
import 'reflect-metadata';
import './utils/container';
import express from 'express';
import userRoutes from './routes/userRoutes';
import carRoutes from './routes/carRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/cars', carRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
