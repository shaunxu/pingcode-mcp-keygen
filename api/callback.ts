import fetch from 'node-fetch';

export default async function handler(req: any, res: any) {
    console.log('Request received at /api/callback:', {
        method: req.method,
        headers: req.headers,
        body: req.body,
        query: req.query,
    });
    const code = req.query.code;
    if (!code) {
        res.status(400).json({ error: 'Missing code parameter' });
        return;
    }
    const clientId = process.env.PINGCODE_CLIENT_ID;
    const clientSecret = process.env.PINGCODE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        res.status(500).json({ error: 'Missing PingCode client credentials in environment variables' });
        return;
    }
    const url = `https://open.pingcode.com/v1/auth/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
    try {
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch token', details: error instanceof Error ? error.message : error });
    }
}
