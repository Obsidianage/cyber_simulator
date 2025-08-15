// src/server/hono/app.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import threats from './routes/threats'  // Import the router
import health from './routes/health'  // Import health router
import type { D1Database } from '@cloudflare/workers-types'

export const app = new Hono<{ Bindings: { DB: D1Database } }>()

app.use('/*', cors())

// Mount the health router under /health
app.route('/health', health)

// Mount the threats router under /threats
app.route('/threats', threats)

export default app