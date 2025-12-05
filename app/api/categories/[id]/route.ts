export const dynamic = 'force-static'

// NOTE (server-only): This file is a server API route for category operations.
// It's a stub for static export builds and will not be available at runtime
// on GitHub Pages. Keeping a minimal module ensures the Next build succeeds.

export async function generateStaticParams() {
  // Provide at least one static param so the export build can succeed.
  // These are placeholder values since API routes are not used in the
  // static export (GitHub Pages) — the real server routes are kept under
  // `server-api/` for server deployments.
  return [{ id: '1' }]
}

export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: 'Category detail (server-only)' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function PUT(request: Request) {
  return new Response(JSON.stringify({ error: 'Not implemented in static export' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function DELETE(request: Request) {
  return new Response(JSON.stringify({ error: 'Not implemented in static export' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  })
}

// Ensure this file is treated as a module during TypeScript checks
export default {}
