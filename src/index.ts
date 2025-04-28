export default async function handler(req: any, res: any) {
    if (req.url && req.url.startsWith('/api/callback')) {
        console.log('Request received at /api/callback:', {
            method: req.method,
            headers: req.headers,
            body: req.body,
            query: req.query,
        });
        res.status(200).send('Callback received');
    } else {
        res.status(404).send('Not found');
    }
}
