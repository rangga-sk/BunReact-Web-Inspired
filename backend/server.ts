import { handleRoutes } from './routes';

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Log setiap request
    console.log(path);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Handle API routes (semua yang dimulai dengan /api/)
    // if (path.startsWith('/api/')) {
    //   return await handleAPI(req, corsHeaders);
    // }

    // Handle page routes
    return await handleRoutes(req, corsHeaders);
  },
});