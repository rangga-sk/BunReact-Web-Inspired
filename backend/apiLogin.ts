export async function handleLogin(req: Request, corsHeaders: Record<string, string>) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;
    console.log(path);
    console.log(method);
};