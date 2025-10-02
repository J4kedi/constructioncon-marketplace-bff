
import { Router } from 'express';
import axios from 'axios';

const router: Router = Router();

const catalogServiceUrl = process.env.SERVICE_CATALOG_URL;
const orderServiceUrl = process.env.SERVICE_ORDERS_URL;

// Proxy para o serviço de catálogo
router.use('/catalog', async (req, res) => {
    try {
        const response = await axios({ 
            method: req.method as any,
            url: `${catalogServiceUrl}${req.originalUrl.replace('/api/proxy/catalog', '')}`,
            data: req.body,
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(response.status).json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error proxying to catalog service' });
    }
});

// Proxy para o serviço de pedidos
router.use('/orders', async (req, res) => {
    try {
        const response = await axios({
            method: req.method as any,
            url: `${orderServiceUrl}${req.originalUrl.replace('/api/proxy/orders', '')}`,
            data: req.body,
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(response.status).json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error proxying to order service' });
    }
});

export default router;
