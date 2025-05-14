import express from 'express';
import cors from 'cors';
import duaRoutes from './routes/duaRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', duaRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));