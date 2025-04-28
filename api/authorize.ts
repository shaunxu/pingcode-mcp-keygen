import process from 'process';

export default function handler(req: any, res: any) {
    const clientId = process.env.PINGCODE_CLIENT_ID;
    if (!clientId) {
        res.status(500).send('PINGCODE_CLIENT_ID is not set');
        return;
    }
    const redirectUrl = `https://open.pingcode.com/auth2/authorize?response_type=code&client_id=${clientId}`;
    res.redirect(302, redirectUrl);
}
