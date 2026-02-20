export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    // Let Cloudflare serve static assets first
    // If a path isn't found, fall back to /index.html (SPA routing)
    const url = new URL(request.url);

    // If request looks like a file (has a dot), let it 404 normally
    const looksLikeFile = url.pathname.split("/").pop()?.includes(".");
    if (!looksLikeFile) {
      url.pathname = "/index.html";
      request = new Request(url.toString(), request);
    }

    return env.ASSETS.fetch(request);
  }
};
