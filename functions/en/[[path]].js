export async function onRequest(context) {
  // This function forces a 404 response for any request under /en/
  // It intercepts the request BEFORE static assets are served, fixing the "ghost file" issue.

  const url = new URL(context.request.url);

  // Construct URL for the custom 404 page (at root /404 or /404.html)
  const notFoundUrl = new URL("/404", url.origin);

  try {
    // Try to fetch the custom 404 page from the deployment assets
    // context.env.ASSETS allows fetching static files from the same deployment
    const asset = await context.env.ASSETS.fetch(notFoundUrl);

    // Return the 404 page content, but FORCE the 404 status code
    return new Response(asset.body, {
      status: 404,
      headers: asset.headers,
    });
  } catch (e) {
    // Fallback: simple text response if custom 404 page fails
    return new Response("404 Not Found", { status: 404 });
  }
}
