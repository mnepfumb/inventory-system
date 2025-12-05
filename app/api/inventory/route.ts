export const dynamic = 'force-static'

// Static stub for `GET /api/inventory` — this is used only for build-time
// validation when `output: 'export'` is enabled. Real API logic should live
// in `server-api/` for server deployments.
export async function GET() {
  return new Response(JSON.stringify({ items: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST() {
  return new Response(JSON.stringify({ error: 'Not available in static export' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default {}