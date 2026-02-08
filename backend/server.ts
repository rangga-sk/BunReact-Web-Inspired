import { handleRoutes } from './routes';
import { testConnection, pool } from '../backend/db/mysql'

// cek koneksi database dahulu
await testConnection();

process.on("SIGINT", async () => {
  console.log("Closing and Killed MySQL");
  await pool.end();
  process.exit(0);
});

const server = Bun.serve({
  port: 3333,
  async fetch(req) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    };

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Handle page routes
    return await handleRoutes(req, corsHeaders);
  },
});