import { handleLogin } from "./apiLogin";

export async function handleRoutes(req: Request, corsHeaders: Record<string, string>) {
    const url = new URL(req.url);
    const path = url.pathname;
  
    // Route: Root - Redirect to login
    if (path === '/') {
      return new Response(null, {
        status: 302,
        headers: { 
          'Location': '/login',
          ...corsHeaders 
        }
      });
    }
    if (path.startsWith("/dist/")) { // untuk tampilkan hasil build jsx di file dist/
      const filePath = '.' + path;
      const file = Bun.file(filePath);
      return new Response(file, {
        headers: { 'Content-Type': 'application/javascript' }
      });
    }
    if (url.pathname === '/styles.css') { // untuk handle css ke hasil build tailwind 
      const file = Bun.file('./public/styles.css');
      return new Response(file);
    }

    // Route: Login Page
    if (path === '/login') {
      try {
        return new Response(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
            <link href="/styles.css" rel="stylesheet">
          </head>
            <body>
              <div id="root"></div>
              <script type="module" src="/dist/LoginPage.js"></script>
            </body>
          </html>
        `, {
          headers: { "Content-Type": "text/html" }
        });
      } catch (error) {
          return new Response('Error loading page html', { status: 500 });
      }
    }

    // Route: Dashboard (Protected)
    if (path === '/dashboard') {
      const token = req.headers.get('Authorization');
      
      if (!token || token !== 'Bearer sample-jwt-token') {
        return new Response(null, {
          status: 302,
          headers: { 
            'Location': '/login',
            ...corsHeaders 
          }
        });
      }
  
      try {
        const html = await Bun.file('./public/dashboard.html').text();
        return new Response(html, {
          headers: { 
            'Content-Type': 'text/html',
            ...corsHeaders 
          }
        });
      } catch (error) {
        return new Response('Error loading page', { status: 500 });
      }
    }
  
    // Route: Static files
    // if (path.startsWith('/api/')) {
    //   if (path.startsWith('/api/login')) {
    //     return handleLogin(req, corsHeaders);
    //   }
    // }

    return new Response('404 - Page Not Found', {
      status: 404,
      headers: corsHeaders
    });
  }
  