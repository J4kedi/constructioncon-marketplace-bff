
import { Router } from 'express';
import axios from 'axios';

const router: Router = Router();

const catalogServiceUrl = process.env.SERVICE_CATALOG_URL;
const quoteServiceUrl = process.env.SERVICE_QUOTE_URL;

router.get('/produtos-detalhados/:id', async (req, res) => {
    try {
        const { id: productId } = req.params;

        if (!catalogServiceUrl || !quoteServiceUrl) {
            throw new Error('Service URLs are not configured');
        }

        const productRequest = axios.get(`${catalogServiceUrl}/products/${productId}`);
        const quoteRequest = axios.get(`${quoteServiceUrl}/quote?productId=${productId}`);

        const [productResponse, quoteResponse] = await Promise.all([
            productRequest,
            quoteRequest,
        ]);

        const aggregatedData = {
            ...productResponse.data,
            quote: quoteResponse.data,
        };

        res.status(200).json(aggregatedData);

    } catch (error: any) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { message: 'Error aggregating product details' };
        res.status(status).json(data);
    }
});

export default router;
