export default function handler(req: any, res: any) {
    console.log('Request received at /api/callback:', {
        method: req.method,
        headers: req.headers,
        body: req.body,
        query: req.query,
    });
    res.status(200).send('Callback received');
}
