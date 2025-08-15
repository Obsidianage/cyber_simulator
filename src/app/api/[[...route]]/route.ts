// Forward Next.js API requests to Hono
import { app } from '@/server/hono/app' // uses the default @/* alias from create-next-app

// Use Edge runtime for speed & Web standard Request handling.
// If you later need Node-only libs (e.g., Prisma), change to 'nodejs'.
export const runtime = 'edge'

const handler = (req: Request) => app.fetch(req)

// Map all HTTP verbs
export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as OPTIONS,
}
