
import { Router } from 'express';
import axios from 'axios';

const router: Router = Router();

const catalogServiceUrl = process.env.SERVICE_CATALOG_URL;
const orderServiceUrl = process.env.SERVICE_ORDERS_URL;

router.use('/catalog', async (req, res) => {
    try {
        const finalUrl = `${catalogServiceUrl}${req.originalUrl.replace('/proxy/catalog', '')}`;
                console.log(`Proxying to catalog service: ${finalUrl}`);
                const response = await axios({ 
                    method: req.method as any,
                    url: finalUrl,
            params: req.query,
            data: req.body,
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(response.status).json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error proxying to catalog service' });
    }
});

router.use('/orders', async (req, res) => {
    try {
        const response = await axios({
            method: req.method as any,
            url: `${orderServiceUrl}${req.originalUrl.replace('/proxy/orders', '')}`,
            data: req.body,
            headers: { 'Content-Type': 'application/json' }
        });        res.status(response.status).json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error proxying to order service' });
    }
});

export default router;
