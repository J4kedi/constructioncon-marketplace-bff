
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import proxyRouter from './routes/proxy.js';
import aggregationRouter from './routes/aggregation.js';

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/proxy', proxyRouter);
app.use('/api', aggregationRouter);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`BFF running at http://localhost:${port}`);
});
