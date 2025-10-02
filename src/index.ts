
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

import proxyRouter from './routes/proxy';
import aggregationRouter from './routes/aggregation';

app.use(express.json());

app.use('/api/proxy', proxyRouter);
app.use('/api', aggregationRouter);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'BFF is running' });
});

app.listen(port, () => {
    console.log(`BFF running at http://localhost:${port}`);
});
