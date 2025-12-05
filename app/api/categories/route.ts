export const dynamic = 'force-static'

// NOTE (server-only): This file is a server API route. For static exports
// it will not be available. This stub keeps the file a valid module so the
// Next.js build completes successfully.

export async function GET() {
	return new Response(JSON.stringify({ message: 'Categories API (server-only)' }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	})
}

export async function POST() {
	return new Response(JSON.stringify({ error: 'Not implemented in static export' }), {
		status: 501,
		headers: { 'Content-Type': 'application/json' },
	})
}

// Ensure this file is treated as a module during TypeScript checks
export default {}
